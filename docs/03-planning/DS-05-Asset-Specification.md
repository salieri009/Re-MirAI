# Asset Specification Document

This document lists all required art, visual effects, and audio assets for the Re:MirAI project.

## 1. Character Art Assets

| Asset Name | Description | Format | Resolution/Spec | Est. Quantity |
| :--- | :--- | :--- | :--- | :--- |
| **Base Illustration** | Full-body, high-quality illustration for each archetype. | PNG (Transparent) | 2048x2048 px | 15+ |
| **Portrait/Bust-up** | Used in chat windows and UI profiles. Multiple expressions (neutral, happy, sad, angry, blush). | PNG (Transparent) | 512x512 px | 15 x 5 expressions |
| **Special Illustration** | High-quality CG unlocked via Bond Levels. Scene-based. | JPEG/PNG | 1920x1080 px | 20+ (for launch) |
| **Costume Sheets** | Variations of the base illustration with different outfits. | PNG (Transparent) | 2048x2048 px | 10+ (for launch) |
| **Chibi/SD Version** | Small, stylized version for UI indicators or room animations. | PNG (Transparent) | 256x256 px | 15+ |

## 2. UI & Icon Assets

| Asset Name | Description | Format | Resolution/Spec | Est. Quantity |
| :--- | :--- | :--- | :--- | :--- |
| **Stat Icons** | Unique icons for [Charisma], [Intellect], [Kindness], [Instability], [Spirit]. | SVG/PNG | 128x128 px | 5 |
| **Currency Icons** | Icons for Memory Crystals and other potential in-app currencies. | SVG/PNG | 128x128 px | 2-3 |
| **Archetype Icons** | Simple, symbolic icons representing each character archetype. | SVG/PNG | 128x128 px | 15+ |
| **UI Frames/Windows** | Themed frames for modals, buttons, and text boxes. | 9-slice PNG/SVG | N/A | 10+ styles |
| **Profile Card Template** | The background and layout for the shareable Persona profile card. | PSD/Figma | 1200x630 px | 1 |

## 3. VFX & Motion Graphic Assets

| Asset Name | Description | Format | Notes |
| :--- | :--- | :--- | :--- |
| **Summoning Sequence** | A multi-stage animation. Requires several components. | Spritesheets, JSON (Lottie/Spine) | - Data particles gathering effect<br>- Stat keywords flashing<br>- Light eruption / explosion<br>- Silhouette reveal effect |
| **UI Transitions** | Animated transitions for screen changes. | JSON (Lottie) or CSS | Fade, slide, iris-in/out with thematic elements. |
| **Button Interactions** | Hover, press, and disabled states for buttons. | CSS / Spritesheet | Subtle glow, scaling, or particle effects. |
| **Idle Animations** | Subtle animations for the Persona in their room (breathing, blinking, occasional small movements). | Live2D/Spine export or Spritesheet | Makes the character feel alive. |

## 4. Audio Assets

| Asset Name | Description | Format | Notes |
| :--- | :--- | :--- | :--- |
| **BGM - Main Theme** | Music for the landing page and promotional material. | MP3/OGG | Mystical, emotional, and grand. |
| **BGM - Room** | Calm, gentle, and relaxing music for the Persona's room. | MP3/OGG | Should be pleasant to listen to for long periods. |
| **BGM - Chat** | Neutral, unobtrusive background music for the chat screen. | MP3/OGG | |
| **SFX - Summon Climax** | The powerful sound effect for the moment the Persona is revealed. | WAV | The most important sound in the app. |
| **SFX - UI Clicks** | Sound effects for button clicks, screen transitions, receiving items. | WAV | Should be satisfying and fit the theme (e.g., crystalline sounds). |
| **SFX - Notification** | Sound for new messages or when a goal is completed. | WAV | |
| **Voice Overs (VO)** | Short, voiced lines for key moments. (Optional for MVP) | WAV | - Summoning: "I am..."<br>- Room: Welcome message<br>- Gift: Thank you message |
