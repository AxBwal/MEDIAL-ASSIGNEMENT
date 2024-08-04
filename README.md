# PostPage Component

The `PostPage` component is a React-based user interface for creating and sharing blog posts. It allows users to input a title, content, and an image, then generate an Open Graph (OG) image for sharing on social media. Users can also download the image or copy its URL to the clipboard.

## Features

- **Title and Content Input**: Users can input a title and content for their post.
- **Image Upload**: Users can upload an image to be included in the post.
- **OG Image Generation**: Automatically generates an Open Graph image with a 1200x630 pixel resolution.
- **Image Download**: Allows users to download the generated OG image.
- **Copy URL to Clipboard**: Users can copy the OG image URL for easy sharing.
- **Live Preview**: Provides a live preview of the post with the title, content, and image.

## Libraries Used

- **React**: JavaScript library for building user interfaces.
- **html-to-image**: Converts HTML elements to images.
- **react-helmet**: Manages the document head for dynamic updates to the page title and meta tags.
- **react-hot-toast**: Provides notifications for user actions.

## Setup

1. **Install Dependencies**

   Ensure you have Node.js installed. Then, in your project directory, install the necessary packages:

   ```bash
   npm install html-to-image react-helmet react-hot-toast

