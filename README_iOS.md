# Video Downloader iOS App

A native iOS application built with SwiftUI that allows users to download videos from YouTube, Instagram, and Facebook directly on their iPhone or iPad.

## Features

- **Multi-Platform Support**: Download videos from YouTube, Instagram, and Facebook
- **Smart Platform Detection**: Automatically detects the platform from the URL
- **Quality Selection**: Choose video quality for YouTube videos (144p, 360p, 720p, 1080p)
- **Modern UI**: Beautiful SwiftUI interface with platform-specific colors and icons
- **Real-time Feedback**: Loading states, success messages, and error handling
- **Native iOS Experience**: Follows iOS design guidelines and conventions

## Project Structure

```
VideoDownloader/
├── VideoDownloaderApp.swift          # Main app entry point
├── ContentView.swift                 # Main UI view
├── VideoDownloaderModel.swift        # Data model and state management
├── VideoDownloaderService.swift      # Service layer for video downloads
├── PlatformDetector.swift           # Platform detection logic
├── Assets.xcassets/                  # App icons and assets
└── Preview Content/                  # SwiftUI preview assets
```

## Setup Instructions

### Prerequisites

- Xcode 15.0 or later
- iOS 17.0 or later
- Apple Developer Account (for device deployment)

### Installation

1. **Clone or Download the Project**

   ```bash
   git clone <repository-url>
   cd VideoDownloader
   ```

2. **Open in Xcode**

   - Open `VideoDownloader.xcodeproj` in Xcode
   - Select your development team in project settings
   - Update the bundle identifier if needed

3. **Configure Video Download Service**

   - The app currently uses a placeholder implementation
   - You'll need to integrate with a real video download API
   - See "Video Download Implementation" section below

4. **Build and Run**
   - Select your target device (iPhone/iPad simulator or physical device)
   - Press Cmd+R to build and run

## Video Download Implementation

### Current Implementation

The app currently includes a placeholder implementation that simulates the download process. To make it fully functional, you have several options:

#### Option 1: Use a Video Download API Service

1. **Sign up for a video download API service** such as:

   - RapidAPI Video Download APIs
   - Video Download API
   - SaveFrom.net API

2. **Update VideoDownloaderService.swift**
   ```swift
   // Replace the placeholder implementation with real API calls
   private func downloadUsingAPI(url: String, quality: String, platform: VideoPlatform) async throws -> DownloadResult {
       // Implement real API integration here
   }
   ```

#### Option 2: Create a Backend Server

1. **Deploy your existing Next.js backend** (from the web version)
2. **Update the API endpoint** in VideoDownloaderService.swift
3. **Ensure CORS is properly configured** for iOS requests

#### Option 3: Use a Third-Party Library

Consider using libraries like:

- `youtube-dl` (requires additional setup)
- Custom video extraction libraries

### Required Permissions

Add these to your `Info.plist`:

```xml
<!-- Network permissions -->
<key>NSAppTransportSecurity</key>
<dict>
    <key>NSAllowsArbitraryLoads</key>
    <true/>
</dict>

<!-- Photo library access (if saving videos) -->
<key>NSPhotoLibraryUsageDescription</key>
<string>This app needs access to save downloaded videos to your photo library.</string>
```

## Architecture

### MVVM Pattern

The app follows the Model-View-ViewModel (MVVM) architecture:

- **Model**: `VideoDownloaderModel` - Manages app state and business logic
- **View**: `ContentView` - SwiftUI views and UI components
- **ViewModel**: `VideoDownloaderModel` - Handles data binding and user interactions

### Key Components

#### PlatformDetector

- Detects video platform from URLs
- Provides platform-specific information (colors, icons, quality options)

#### VideoDownloaderModel

- Manages app state using `@Published` properties
- Handles user interactions and form validation
- Coordinates with the download service

#### VideoDownloaderService

- Handles actual video download operations
- Manages network requests and error handling
- Provides download result information

## UI Features

### Platform Detection

- Real-time platform detection as user types
- Visual badges showing detected platform
- Platform-specific colors and icons

### Quality Selection

- YouTube: Multiple quality options (144p to 1080p)
- Instagram/Facebook: Best available quality only
- Dynamic UI that adapts to platform capabilities

### User Feedback

- Loading indicators during download
- Success messages with auto-dismiss
- Error alerts with detailed messages
- Form validation with visual feedback

## Customization

### Colors and Styling

- Platform-specific colors in `PlatformDetector.swift`
- Custom gradients and styling in `ContentView.swift`
- Easy to modify for different themes

### Icons

- Uses SF Symbols for consistent iOS design
- Platform-specific icons can be customized
- Easy to replace with custom icon sets

### Text and Localization

- All text is easily localizable
- Platform names and messages can be customized
- Support for multiple languages

## Deployment

### App Store Deployment

1. **Configure App Store Connect**

   - Create a new app in App Store Connect
   - Set up app metadata and screenshots

2. **Archive and Upload**

   - Select "Any iOS Device" as target
   - Product → Archive
   - Upload to App Store Connect

3. **Submit for Review**
   - Ensure compliance with App Store guidelines
   - Provide clear app description and usage

### Enterprise/Ad Hoc Distribution

1. **Configure Provisioning Profile**

   - Create appropriate provisioning profile
   - Add device UDIDs for testing

2. **Build and Distribute**
   - Archive the app
   - Export for enterprise/ad hoc distribution

## Legal Considerations

### Terms of Service Compliance

- Ensure compliance with YouTube's, Instagram's, and Facebook's Terms of Service
- Respect copyright laws and intellectual property rights
- Consider implementing content filtering

### Privacy

- Handle user data responsibly
- Implement appropriate privacy policies
- Consider GDPR and other privacy regulations

## Troubleshooting

### Common Issues

1. **Build Errors**

   - Ensure Xcode version compatibility
   - Check iOS deployment target
   - Verify all dependencies are properly linked

2. **Network Issues**

   - Check API endpoint configuration
   - Verify network permissions
   - Test with different network conditions

3. **Platform Detection Issues**
   - Verify URL format handling
   - Test with various URL formats
   - Check platform detection logic

### Debug Tips

- Use Xcode's debug console for logging
- Test with different device types and iOS versions
- Monitor network requests using Xcode's network profiler
- Use SwiftUI previews for rapid UI development

## Future Enhancements

### Potential Features

- Background downloads
- Download queue management
- Video format conversion
- Cloud storage integration
- Social sharing features
- Download history
- Offline video management

### Technical Improvements

- Core Data integration for download history
- Background app refresh
- Push notifications for download completion
- Advanced error handling and retry logic
- Performance optimizations

## Support

For issues and questions:

1. Check the troubleshooting section
2. Review Apple's developer documentation
3. Test with different devices and iOS versions
4. Consider community forums and Stack Overflow

## License

This project is provided as-is for educational and development purposes. Ensure compliance with all applicable laws and platform terms of service before distribution.
