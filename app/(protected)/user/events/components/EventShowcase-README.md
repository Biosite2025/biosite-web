# Event Showcase Component

## Overview
An immersive event media section inspired by modern event websites, featuring a scroll-triggered video background with smooth scaling animations and an infinite scrolling image gallery.

## Features

### 🎬 Video Section
- **Full-width video background** that auto-plays, loops, and is muted
- **Scroll-triggered scaling** - video expands smoothly as user scrolls
- **Fade-in title and subtitle** that appears over the video
- **Cinematic text animations** with fade and zoom effects
- **Responsive design** for all device sizes

### 🖼️ Image Gallery
- **Dual-row infinite scrolling gallery**
- Top row scrolls **right to left**
- Bottom row scrolls **left to right**
- **Hover effects** with zoom and shadow transitions
- **Pause on hover** for accessibility
- **Seamless looping** with duplicated image arrays

## Setup Instructions

### 1. Video Setup
To add your event video:

1. Place your video file in `/public/videos/`
2. Name it `event-showcase.mp4` (or update the source path in the component)
3. Recommended video specifications:
   - Format: MP4 (H.264)
   - Resolution: 1920x1080 or higher
   - Duration: 10-30 seconds (will loop)
   - Size: Under 10MB for web performance

If no video is available, the component will fall back to a static image.

### 2. Image Gallery Setup
The gallery uses images from `/public/asset/`. To customize:

1. Add your event photos to `/public/asset/`
2. Update the `eventImages` array in the component with your image paths
3. Recommended image specifications:
   - Format: JPG, PNG, or WebP
   - Aspect ratio: 4:3 or 16:10
   - Resolution: 800x600 minimum
   - Optimized for web (under 500KB each)

### 3. Customization Options

#### Colors
The component uses your brand colors:
- Primary: `#2B3990`
- Secondary: `#2B7CD3`

To change colors, update the Tailwind classes in the component.

#### Text Content
Update the following text elements:
- Main title: "Experience Our Amazing Events"
- Subtitle: Event description
- Gallery title: "Snaps from Our Events"
- Gallery description: Event gallery description
- CTA button: "View All Events"

#### Animation Timing
Adjust scroll trigger points and animation durations in the `useTransform` hooks:
- Video scaling: `[0, 0.5]` (scroll progress points)
- Title opacity: `[0.2, 0.4, 0.7, 0.9]`
- Animation durations in `transition` props

## Dependencies

✅ **Already Installed:**
- `framer-motion` - For scroll-based animations and smooth transitions
- `clsx` - For conditional class management
- `tailwindcss` - For styling and responsive design
- `react` & `typescript` - Core framework

## Usage

```tsx
import EventShowcase from './components/EventShowcase';

export default function EventsPage() {
  return (
    <div>
      <EventShowcase />
      {/* Other page content */}
    </div>
  );
}
```

## Performance Considerations

- **Video optimization**: Use compressed MP4 files
- **Image optimization**: Use Next.js Image component for production
- **Smooth animations**: CSS transforms are GPU-accelerated
- **Lazy loading**: Images load as needed during scroll
- **Reduced motion**: Consider adding `prefers-reduced-motion` support

## Browser Support

- **Modern browsers**: Chrome, Firefox, Safari, Edge
- **Mobile support**: iOS Safari, Chrome Mobile
- **Fallbacks**: Static images for unsupported video formats

## Accessibility Features

- **Reduced motion**: Animations respect user preferences
- **Keyboard navigation**: All interactive elements are accessible
- **Screen readers**: Proper alt text and ARIA labels
- **Pause on hover**: Gallery animations pause for user control
- **Semantic HTML**: Proper heading hierarchy and structure

## Troubleshooting

### Video not playing
- Check file path: `/public/videos/event-showcase.mp4`
- Ensure MP4 format with H.264 codec
- Browser autoplay policies may require user interaction

### Images not loading
- Verify image paths in `/public/asset/`
- Check image file formats (JPG, PNG, WebP)
- Update `eventImages` array with correct paths

### Performance issues
- Reduce video file size
- Optimize images (use WebP format)
- Consider lazy loading for large galleries
- Test on various devices and network speeds