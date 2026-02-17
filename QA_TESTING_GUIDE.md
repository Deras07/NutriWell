# Nutriwell App - QA Testing Guide

## Breakpoint Testing

Test the following breakpoints to ensure responsive design:

- **360px** - Small mobile devices (iPhone SE)
- **414px** - Standard mobile phones (iPhone 12/13/14)
- **640px** - Large mobile devices (iPhone Plus models)
- **768px** - Tablets portrait
- **1024px** - Tablets landscape / small laptops
- **1280px** - Desktop standard
- **1440px** - Large desktop screens

## Visual Verification Checklist

### 1. No Hidden Text
- [ ] All text is visible and readable
- [ ] No text is cut off or overlapping
- [ ] Text contrast meets WCAG AA standards (4.5:1 minimum)
- [ ] No white text on white backgrounds
- [ ] No dark text on dark backgrounds

### 2. No Overlapping Elements
- [ ] Cards don't overlap each other
- [ ] Buttons don't overlap text
- [ ] Navigation elements are properly spaced
- [ ] Modal content doesn't overlap with background
- [ ] Dropdown menus appear above content

### 3. Layout Issues
- [ ] No horizontal scrolling on any breakpoint
- [ ] Content is properly centered
- [ ] Grid layouts stack correctly on mobile
- [ ] Sidebar content is accessible
- [ ] No content is cut off at screen edges

### 4. Dropdown and Modal Behavior
- [ ] Dropdowns appear above other content (z-index: 60)
- [ ] Modals appear above dropdowns (z-index: 80)
- [ ] Tooltips appear above modals (z-index: 90)
- [ ] No dropdowns are hidden behind other elements
- [ ] Modal backdrops cover entire screen

### 5. Input and Form Elements
- [ ] Input chips don't cover input fields
- [ ] Search bars are fully visible
- [ ] Form validation messages are readable
- [ ] Focus states are clearly visible
- [ ] Touch targets are minimum 44px

## Accessibility Testing

### 1. Keyboard Navigation
- [ ] Tab through all interactive elements
- [ ] Enter/Space activate buttons
- [ ] Escape closes modals and dropdowns
- [ ] Focus returns to trigger after closing
- [ ] No keyboard traps

### 2. Screen Reader Testing
- [ ] All images have alt text
- [ ] Form labels are properly associated
- [ ] Headings follow proper hierarchy
- [ ] ARIA labels are descriptive
- [ ] Live regions announce updates

### 3. Focus Management
- [ ] Focus indicators are visible
- [ ] Focus order is logical
- [ ] Focus doesn't jump unexpectedly
- [ ] Skip links work properly
- [ ] Focus is trapped in modals

## Performance Testing

### 1. Layout Stability
- [ ] No Cumulative Layout Shift (CLS) on send/receive
- [ ] Images load with proper aspect ratios
- [ ] No content jumping during loading
- [ ] Skeleton screens maintain layout
- [ ] Animations don't cause layout shifts

### 2. Loading States
- [ ] Skeleton screens show during loading
- [ ] Loading spinners are visible
- [ ] No blank screens during data fetch
- [ ] Error states are handled gracefully
- [ ] Offline states are informative

## Component-Specific Testing

### 1. Chat Interface
- [ ] Messages are readable
- [ ] Input field is accessible
- [ ] Send button works
- [ ] Message history scrolls properly
- [ ] New messages are announced

### 2. Navigation
- [ ] All tabs are clickable
- [ ] Active tab is highlighted
- [ ] Mobile menu opens/closes
- [ ] Breadcrumbs are functional
- [ ] Back button works

### 3. Cards and Modals
- [ ] Cards are clickable
- [ ] Hover states work
- [ ] Modals open/close properly
- [ ] Modal content is scrollable
- [ ] Close buttons are accessible

## Browser Testing

Test on:
- [ ] Chrome (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Edge (latest)
- [ ] Mobile browsers (iOS Safari, Chrome Mobile)

## Device Testing

### Mobile
- [ ] Touch targets are 44px minimum
- [ ] Swipe gestures work
- [ ] Virtual keyboard doesn't cover inputs
- [ ] Orientation changes work
- [ ] Performance is smooth

### Tablet
- [ ] Layout adapts properly
- [ ] Touch interactions work
- [ ] Split-screen mode works
- [ ] Stylus input works
- [ ] Performance is acceptable

### Desktop
- [ ] Mouse hover states work
- [ ] Keyboard shortcuts work
- [ ] Window resizing works
- [ ] Multiple monitors work
- [ ] Performance is excellent

## Error Handling

- [ ] Network errors are handled
- [ ] Invalid inputs show proper messages
- [ ] 404 pages are informative
- [ ] Server errors don't crash the app
- [ ] Recovery paths are clear

## Security Testing

- [ ] No sensitive data in console logs
- [ ] Input validation prevents XSS
- [ ] Authentication flows work
- [ ] Session management is secure
- [ ] HTTPS is enforced

## Documentation

- [ ] README is up to date
- [ ] Component documentation exists
- [ ] API documentation is current
- [ ] Deployment guide is accurate
- [ ] Troubleshooting guide exists
