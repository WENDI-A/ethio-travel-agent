# Animated Hero Component Documentation

## Overview
A stunning, responsive hero section featuring a centered headline "Where Wonders Await" with continuously animating image panels on the left and right sides. Built with Tailwind CSS and Framer Motion.

## Component Location
- **Component**: [AnimatedHero.tsx](file:///c:/Users/wendi/ethio-travel/components/AnimatedHero.tsx)
- **Demo Page**: [hero-demo/page.tsx](file:///c:/Users/wendi/ethio-travel/app/hero-demo/page.tsx)
- **Live Demo**: http://localhost:3000/hero-demo

## Features

### ✨ Visual Effects
- **Parallax Animation**: Image panels continuously scroll from bottom to top
- **Smooth Looping**: Seamless infinite loop with duplicated image sets
- **Fade-in Effects**: Soft opacity transitions on load
- **Subtle Scale**: Depth effect with scale animations
- **Gradient Overlays**: Soft gradients on images for better text contrast
- **Ambient Glow**: Background blur effects for atmosphere

### 📱 Responsive Design
- **Desktop (lg+)**: Full layout with left and right image panels
- **Tablet/Mobile**: Image panels hidden, centered content only
- **Flexible Typography**: Responsive text sizes (5xl to 8xl)
- **Adaptive Spacing**: Proper padding and margins on all screen sizes

### ♿ Accessibility
- **Alt Text**: Descriptive alt text for all images
- **Semantic HTML**: Proper heading hierarchy
- **Keyboard Navigation**: Focusable interactive elements
- **ARIA Labels**: Screen reader friendly

## Technical Details

### Animation Specifications
- **Left Panel**: 40-second loop duration
- **Right Panel**: 45-second loop duration (different speed for visual interest)
- **Transition**: Linear easing for smooth continuous motion
- **Initial State**: Images start at 100% (bottom)
- **End State**: Images end at -100% (top)

### Image Configuration

#### Left Panel (Landscapes)
1. Simien Mountains - Dramatic peaks
2. Lalibela - Rock-hewn churches
3. Danakil Depression - Colorful mineral pools

#### Right Panel (Culture & Heritage)
1. Gondar - Fasilides Palace
2. Addis Ababa - Modern cityscape
3. Omo Valley - Traditional culture

### Styling Details
- **Background**: Dark gradient (gray-900 → gray-800 → black)
- **Headline Color**: White with yellow gradient on "Wonders"
- **Panel Width**: 25% each on desktop
- **Panel Spacing**: 4px margin between images
- **Border Radius**: Rounded corners (rounded-2xl)
- **Shadows**: Deep shadows (shadow-2xl)

## Usage

### Basic Implementation
```tsx
import AnimatedHero from "@/components/AnimatedHero";

export default function Page() {
    return <AnimatedHero />;
}
```

### With Additional Content
```tsx
import AnimatedHero from "@/components/AnimatedHero";

export default function Page() {
    return (
        <div>
            <AnimatedHero />
            <section className="py-20">
                {/* Your content here */}
            </section>
        </div>
    );
}
```

## Customization

### Changing Images
Edit the `leftImages` and `rightImages` arrays in the component:

```tsx
const leftImages = [
    {
        src: "your-image-url.jpg",
        alt: "Descriptive alt text"
    },
    // Add more images...
];
```

### Adjusting Animation Speed
Modify the `duration` in the motion.div transition:

```tsx
transition={{
    duration: 40, // Change this value (seconds)
    repeat: Infinity,
    ease: 'linear',
    repeatType: 'loop'
}}
```

### Changing Headline Text
Update the headline spans in the center content section:

```tsx
<h1 className="...">
    <span>Your</span>
    <span className="...">Custom</span>
    <span>Text</span>
</h1>
```

### Modifying Colors
- **Background**: Change `bg-gradient-to-br from-gray-900 via-gray-800 to-black`
- **Headline Gradient**: Modify `bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-400`
- **Button Colors**: Update button className props

## Performance Considerations

### Optimization Techniques
1. **Client-Side Rendering**: Uses `'use client'` directive
2. **Conditional Animation**: Only animates after client mount
3. **Image Duplication**: Seamless loop without jarring resets
4. **CSS Transforms**: Hardware-accelerated animations
5. **Lazy Loading**: Images load as needed

### Best Practices
- Use optimized images (WebP format recommended)
- Keep image file sizes under 200KB
- Use CDN for image hosting (Cloudinary in this example)
- Limit number of images per panel (3-4 recommended)

## Browser Compatibility
- ✅ Chrome/Edge (latest)
- ✅ Firefox (latest)
- ✅ Safari (latest)
- ✅ Mobile browsers (iOS Safari, Chrome Mobile)

## Dependencies
- **Framer Motion**: ^11.x (animation library)
- **Tailwind CSS**: ^3.x (styling)
- **React**: ^18.x (framework)
- **Next.js**: ^14.x (app router)

## Demo Recording

![Animated Hero Demo](C:/Users/wendi/.gemini/antigravity/brain/94f9be3b-a85a-42ac-b1ed-276546bd3b0b/animated_hero_demo_1764404531116.webp)

The recording shows:
1. Hero section loading with fade-in effects
2. Image panels continuously animating from bottom to top
3. Centered "Where Wonders Await" headline
4. Smooth parallax-like motion
5. Responsive layout demonstration

## Troubleshooting

### Images Not Animating
- Check that `isClient` state is set to true
- Verify Framer Motion is installed
- Ensure images are loading (check network tab)

### Layout Issues on Mobile
- Verify Tailwind breakpoints (lg:block)
- Check responsive classes are applied
- Test on actual mobile device

### Performance Issues
- Reduce animation duration
- Optimize image file sizes
- Limit number of images per panel
- Use lower quality images on mobile

## Future Enhancements
- [ ] Add pause on hover functionality
- [ ] Implement image lazy loading
- [ ] Add touch swipe controls on mobile
- [ ] Create admin panel for image management
- [ ] Add video support for panels
