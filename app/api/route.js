import { exec } from "child_process";
import { NextResponse } from "next/server";

// Helper function to detect platform
function detectPlatform(url) {
  if (url.includes("youtube.com") || url.includes("youtu.be")) {
    return "youtube";
  } else if (url.includes("instagram.com")) {
    return "instagram";
  } else if (url.includes("facebook.com") || url.includes("fb.watch")) {
    return "facebook";
  }
  return "unknown";
}

// Helper function to get platform-specific quality options
function getQualityCommand(platform, quality) {
  switch (platform) {
    case "youtube":
      return `best[height<=${quality.replace("p", "")}]`;
    case "instagram":
    case "facebook":
      // Instagram and Facebook typically have limited quality options
      return "best";
    default:
      return "best";
  }
}

export async function POST(req) {
  try {
    const body = await req.json();
    const { videoUrl, quality } = body;

    if (!videoUrl) {
      return NextResponse.json(
        { error: "Video URL is required." },
        { status: 400 }
      );
    }

    const platform = detectPlatform(videoUrl);

    if (platform === "unknown") {
      return NextResponse.json(
        {
          error:
            "Unsupported platform. Please use YouTube, Instagram, or Facebook URLs.",
        },
        { status: 400 }
      );
    }

    console.log(`Request received for ${platform} video:`, videoUrl);
    console.log("Requested quality:", quality || "best");

    // yt-dlp command to get the list of available formats
    const listFormatsCommand = `yt-dlp -F "${videoUrl}"`;

    return new Promise((resolve) => {
      exec(listFormatsCommand, (error, stdout, stderr) => {
        if (error) {
          console.error(
            `yt-dlp error when fetching available formats for ${platform}:`,
            error.message
          );
          console.error("stderr details:", stderr);
          return resolve(
            NextResponse.json(
              { error: `Failed to fetch video formats from ${platform}.` },
              { status: 500 }
            )
          );
        }

        const formatsList = stdout;
        const qualityFormat = getQualityCommand(platform, quality);

        // For Instagram and Facebook, we'll use the best available format
        // For YouTube, we'll try to match the requested quality
        let command;
        if (platform === "instagram" || platform === "facebook") {
          command = `yt-dlp -f "best" --get-url "${videoUrl}"`;
        } else {
          // Check if the requested format is available for YouTube
          const formatAvailable = formatsList.includes(quality || "best");
          if (!formatAvailable && platform === "youtube") {
            return resolve(
              NextResponse.json(
                {
                  error: `The requested quality (${quality}) is not available for this YouTube video.`,
                  availableFormats: formatsList,
                },
                { status: 400 }
              )
            );
          }
          command = `yt-dlp -f "${qualityFormat}" --get-url "${videoUrl}"`;
        }

        exec(command, (error, stdout, stderr) => {
          if (error) {
            console.error(
              `yt-dlp error when downloading ${platform} video:`,
              error.message
            );
            console.error("stderr details:", stderr);
            resolve(
              NextResponse.json(
                {
                  error: `Failed to fetch video information from ${platform}.`,
                },
                { status: 500 }
              )
            );
            return;
          }

          if (stderr) {
            console.error(`yt-dlp issue (stderr) for ${platform}:`, stderr);
          }

          const downloadUrl = stdout.trim();

          console.log(`Generated download URL for ${platform}:`, downloadUrl);

          // Return the download link in the JSON response
          return resolve(
            NextResponse.json(
              {
                downloadLink: downloadUrl,
                platform: platform,
              },
              { status: 200 }
            )
          );
        });
      });
    });
  } catch (error) {
    console.error("Server error:", error.message);
    return NextResponse.json(
      { error: "Failed to process the request." },
      { status: 500 }
    );
  }
}
