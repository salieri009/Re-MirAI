<template>
  <div class="min-h-screen bg-primary">
    <!-- Hero Section (Nielsen: Aesthetic & Minimalist Design) -->
    <section 
      class="relative overflow-hidden min-h-screen flex items-center" 
      role="main"
      aria-label="Welcome to Re:MirAI"
    >
      <!-- Background Visual Elements -->
      <!-- Figma Color Scheme 41: Festive Eve - Blue/Purple gradient background -->
      <div class="absolute inset-0 bg-gradient-to-br from-primary-50/50 via-primary-100/30 to-secondary-50/50"></div>
      <div class="absolute top-20 left-10 w-32 h-32 bg-primary-400/10 rounded-full blur-3xl animate-pulse" aria-hidden="true"></div>
      <div class="absolute bottom-20 right-10 w-48 h-48 bg-secondary-400/10 rounded-full blur-3xl animate-pulse" style="animation-delay: 1s;" aria-hidden="true"></div>
      
      <!-- KickoffLabs Compliance: Use CSS variable for z-index -->
      <div class="container-page relative" style="padding: var(--container-padding); z-index: var(--z-content);">
        <div class="grid lg:grid-cols-2 items-center" style="gap: var(--section-spacing);">
          <!-- Content Column (Nielsen: Consistency and Standards) -->
          <div 
            class="text-center animate-fade-in" 
            style="display: flex; flex-direction: column; gap: var(--subsection-spacing);"
          >
            <!-- Company Logo/Brand (KickoffLabs Compliance: Appropriate size, centered placement) -->
            <div class="flex justify-center">
              <div class="text-3xl md:text-4xl font-bold text-gradient" role="img" aria-label="Re:MirAI Logo">Re:MirAI</div>
            </div>
            
            <!-- Main Headline (Webflow Typography: Distinct font design, large, high-contrast) -->
            <h1 class="text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-tight tracking-tight">
              Discover Your
              <span class="text-gradient block shimmer-text">True Self</span>
            </h1>
            
            <!-- Description (Webflow Typography: Appropriate spacing, readable size) -->
            <p 
              class="text-xl md:text-2xl text-secondary max-w-lg mx-auto leading-relaxed"
              role="doc-subtitle"
              style="line-height: 1.6;"
            >
              AI Persona created from how your friends actually see you.
            </p>
            
            <!-- Primary CTA (Nielsen: User Control & Freedom, Consistent Center Alignment) -->
            <div 
              class="flex flex-col sm:flex-row justify-center" 
              style="gap: var(--element-spacing);"
              role="group"
              aria-label="Get started options"
            >
              <Button 
                size="lg" 
                class="text-lg" 
                @click="goToLogin"
                aria-describedby="start-description"
              >
                Start Discovery
              </Button>
              <Button 
                variant="ghost" 
                size="lg" 
                class="text-lg" 
                @click="scrollToHowItWorks"
                aria-describedby="how-it-works-description"
              >
                See How
              </Button>
            </div>
            
            <!-- Screen Reader Descriptions -->
            <div class="sr-only">
              <div id="start-description">Begin creating your AI persona by signing up</div>
              <div id="how-it-works-description">Learn about the process of creating your AI persona</div>
            </div>
            
            <!-- Trust Indicators (Nielsen: Help users trust the system, Consistent Center Alignment) -->
            <div 
              class="flex items-center justify-center text-sm text-muted" 
              style="gap: var(--card-spacing);"
              role="group"
              aria-label="Trust indicators"
            >
              <div class="flex items-center" style="gap: var(--text-spacing);">
                <!-- KickoffLabs Compliance: Replaced green with indigo -->
                <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                <span>Free to start</span>
              </div>
              <div class="flex items-center" style="gap: var(--text-spacing);">
                <!-- KickoffLabs Compliance: Replaced blue with purple -->
                <svg class="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4z"/>
                </svg>
                <span>Privacy protected</span>
              </div>
            </div>
          </div>
          
          <!-- Right Column: Hero Image/Visual -->
          <div class="relative animate-slide-up">
            <div class="relative mx-auto max-w-md lg:max-w-lg">
              <!-- Main Persona Card Mockup -->
              <div class="card relative transform rotate-3 hover:rotate-0 transition-transform duration-500">
                <!-- Figma Festive Eve: Blue to Purple gradient -->
                <div class="aspect-[3/4] bg-gradient-primary rounded-xl p-6 text-white">
                  <div class="h-full flex flex-col justify-between">
                    <!-- Persona Image Placeholder -->
                    <div class="w-24 h-24 mx-auto bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <svg class="w-12 h-12 text-white/80" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                      </svg>
                    </div>
                    
                    <!-- Persona Details -->
                    <div class="text-center space-y-3">
                      <h3 class="text-lg font-semibold">Your AI Persona</h3>
                      <div class="text-sm opacity-90">Archetype: Mysterious Sage</div>
                      <div class="text-xs opacity-75">Rarity: SSR</div>
                      
                      <!-- Stats Preview -->
                      <div class="grid grid-cols-2 gap-2 text-xs mt-4">
                        <div class="bg-white/10 rounded p-2">
                          <div class="text-primary-200">Charisma</div>
                          <div class="font-bold">85</div>
                        </div>
                        <div class="bg-white/10 rounded p-2">
                          <div class="text-secondary-200">Kindness</div>
                          <div class="font-bold">92</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <!-- Decorative Elements (Minimal, Nielsen: Aesthetic & Minimalist) -->
              <div class="absolute -top-4 -left-4 w-3 h-3 bg-primary-400 rounded-full opacity-60 animate-pulse" aria-hidden="true"></div>
              <div class="absolute -bottom-4 -right-4 w-2 h-2 bg-secondary-400 rounded-full opacity-60 animate-pulse" style="animation-delay: 2s;" aria-hidden="true"></div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- How It Works Section (Prismic: Benefits over Features) -->
    <section 
      id="how-it-works" 
      class="relative overflow-hidden bg-gradient-to-b from-transparent via-primary-900/5 to-secondary-900/10" 
      style="padding: var(--section-spacing) 0;"
      role="region"
      aria-labelledby="how-it-works-heading"
    >
      <!-- Background Pattern -->
      <div class="absolute inset-0 opacity-30">
        <div class="absolute top-10 left-1/4 w-64 h-64 bg-primary-500/10 rounded-full blur-3xl animate-float"></div>
        <div class="absolute bottom-20 right-1/4 w-96 h-96 bg-secondary-500/10 rounded-full blur-3xl animate-float" style="animation-delay: 2s;"></div>
      </div>
      
      <!-- KickoffLabs Compliance: Use CSS variable for z-index -->
      <div class="container-page relative" style="padding: 0 var(--container-padding); z-index: var(--z-content);">
        <!-- Section Header (Awebco: Compelling Value Proposition) -->
        <div 
          class="text-center" 
          style="display: flex; flex-direction: column; gap: var(--subsection-spacing); margin-bottom: calc(var(--section-spacing) * 1.5);"
        >
          <div class="space-y-4">
            <div class="inline-block px-4 py-2 bg-primary-500/20 rounded-full text-sm text-primary-300 font-medium">
              The Mirror of Relationships
            </div>
            <!-- Webflow Typography: Use contrast to create hierarchy - H2 distinct from H1 -->
            <h2 id="how-it-works-heading" class="text-4xl md:text-6xl font-bold text-white leading-tight tracking-tight">
              Stop Guessing.
              <span class="text-gradient block">Start Knowing.</span>
            </h2>
          </div>
          <div style="display: flex; justify-content: center; width: 100%;">
            <!-- Webflow Typography: Appropriate spacing for body text -->
            <p class="text-xl md:text-2xl text-secondary max-w-lg text-center leading-relaxed" style="text-align: center; margin: 0 auto; line-height: 1.6;">
              While personality tests tell you what <em>you</em> think about yourself, 
              <strong class="text-white">Re:MirAI reveals how your friends actually see you.</strong>
            </p>
          </div>
          
          <!-- Trust Features (Nielsen: Consistency and Standards) -->
          <!-- KickoffLabs Compliance: All indicators use indigo/purple (2-color palette) -->
          <div class="flex flex-wrap justify-center items-center text-sm text-muted" style="gap: var(--subsection-spacing); margin-top: var(--subsection-spacing);">
            <div class="flex items-center" style="gap: var(--text-spacing);">
              <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
              <div class="w-6 h-6 bg-primary-400 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Quick setup</span>
            </div>
            <div class="flex items-center" style="gap: var(--text-spacing);">
              <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
              <div class="w-6 h-6 bg-secondary-400 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>Anonymous feedback</span>
            </div>
            <div class="flex items-center" style="gap: var(--text-spacing);">
              <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
              <div class="w-6 h-6 bg-primary-500 rounded-full flex items-center justify-center">
                <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span>AI-powered insights</span>
            </div>
          </div>
        </div>
        
        <!-- Revolutionary Process (20-Year UX Design Expertise) -->
        <div class="relative">
          <!-- Differentiation Statement (Nielsen: Consistency and Standards) -->
          <div class="text-center" style="margin-bottom: var(--section-spacing);">
            <div class="inline-flex items-center bg-gradient-to-r from-primary-500/20 to-secondary-500/20 rounded-full text-primary-300 text-sm font-medium" style="gap: var(--tight-spacing); padding: var(--element-spacing) var(--card-spacing); margin-bottom: var(--card-spacing);">
              <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
              </svg>
              <span>Unlike MBTI, Enneagram, or other self-assessment tools</span>
            </div>
            <h3 class="text-2xl md:text-3xl font-semibold text-white" style="margin-bottom: var(--element-spacing);">
              Re:MirAI gives you the <span class="text-gradient">truth</span> about yourself
            </h3>
            <p class="text-lg text-secondary max-w-2xl mx-auto">
              Based on anonymous insights from people who know you best
            </p>
          </div>

          <!-- Interactive Process Flow -->
          <div class="relative">
            <!-- Animated Connection Lines -->
            <!-- KickoffLabs Compliance: Use CSS variable for z-index consistency -->
            <svg class="absolute inset-0 w-full h-full pointer-events-none hidden lg:block" style="z-index: var(--z-decorative);">
              <defs>
                <!-- KickoffLabs Compliance: Consolidated pink to purple -->
                <linearGradient id="connection-gradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" style="stop-color:#6366f1;stop-opacity:0.6" />
                  <stop offset="50%" style="stop-color:#a855f7;stop-opacity:0.8" />
                  <stop offset="100%" style="stop-color:#9333ea;stop-opacity:0.6" />
                </linearGradient>
              </defs>
              <path 
                d="M 200 100 Q 400 50 600 100 Q 800 150 1000 100" 
                stroke="url(#connection-gradient)" 
                stroke-width="2" 
                fill="none" 
                stroke-dasharray="10,5"
                class="animate-pulse"
              />
            </svg>

            <div 
              class="grid lg:grid-cols-3" 
              style="gap: var(--card-spacing);"
              role="list"
              aria-label="Re:MirAI process steps"
            >
              <!-- Step 1: The Mirror Setup (Benefits-Focused) -->
              <div 
                class="relative group" 
                role="listitem"
              >
                <div class="card demo-highlight bg-gradient-to-br from-primary-500/10 via-secondary-500/5 to-transparent border-primary-500/30 hover:border-primary-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-primary-500/25" style="padding: var(--card-padding);">
                  <div class="text-center" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
                    <!-- Step Number with Animation -->
                    <div class="relative">
                      <div class="w-20 h-20 mx-auto bg-gradient-primary rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <!-- KickoffLabs Compliance: Use CSS variable for z-index -->
                        <span class="relative" style="z-index: var(--z-content);">1</span>
                      </div>
                      <div class="absolute inset-0 w-20 h-20 mx-auto bg-primary-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <!-- Visual Metaphor (3D Icon) -->
                    <div class="relative flex justify-center mb-4">
                      <IconMirror :size="64" />
                    </div>
                    
                    <!-- Benefit-Focused Content (Nielsen: Consistency) -->
                    <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
                      <h3 class="text-xl font-bold text-white">The Mirror Setup</h3>
                      <p class="text-sm text-primary-300 font-medium">Create and share your survey</p>
                      <p class="text-secondary leading-relaxed">
                        Create a personalized questionnaire and share it with friends. 
                        <strong class="text-white">They'll tell you truths you never knew.</strong>
                      </p>
                    </div>
                    
                    <!-- Micro-interaction (Aligned) -->
                    <div class="border-t border-primary-500/20" style="padding-top: var(--element-spacing);">
                      <div class="text-xs text-primary-400" style="display: flex; flex-direction: column; gap: var(--micro-spacing);">
                        <div class="flex justify-between items-center">
                          <span>Process:</span>
                          <span class="font-medium">Simple & Fast</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span>Privacy:</span>
                          <span class="font-medium text-secondary-300">100% Anonymous</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 2: The Truth Collection (Emotional Hook) -->
              <div 
                class="relative group" 
                role="listitem"
              >
                <!-- KickoffLabs Compliance: Consolidated pink to purple -->
                <div class="card demo-highlight bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25" style="padding: var(--card-padding);">
                  <div class="text-center" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
                    <!-- Step Number -->
                    <div class="relative">
                      <div class="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <!-- KickoffLabs Compliance: Use CSS variable for z-index -->
                        <span class="relative" style="z-index: var(--z-content);">2</span>
                      </div>
                      <div class="absolute inset-0 w-20 h-20 mx-auto bg-purple-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <!-- Visual Story (3D Icon) -->
                    <div class="relative flex justify-center mb-4">
                      <IconChat :size="64" />
                    </div>
                    
                    <!-- The Hook (Consistent Spacing) -->
                    <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
                      <h3 class="text-xl font-bold text-white">The Truth Unveiled</h3>
                      <p class="text-sm text-purple-300 font-medium">Real perceptions, raw insights</p>
                      <p class="text-secondary leading-relaxed">
                        Friends share their <em>honest</em> perceptions about your personality. 
                        <strong class="text-white">Prepare for surprises.</strong>
                      </p>
                    </div>
                    
                    <!-- Feature Highlights (Aligned) -->
                    <div class="border-t border-purple-500/20" style="padding-top: var(--element-spacing);">
                      <div class="text-xs text-purple-400" style="display: flex; flex-direction: column; gap: var(--micro-spacing);">
                        <div class="flex justify-between items-center">
                          <span>Feedback Type:</span>
                          <!-- KickoffLabs Compliance: Replaced green with indigo -->
                          <span class="font-medium text-indigo-300">Anonymous</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span>Privacy:</span>
                          <!-- KickoffLabs Compliance: Replaced blue with purple -->
                          <span class="font-medium text-purple-300">Protected</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Step 3: The AI Revelation (Transformation) -->
              <div 
                class="relative group" 
                role="listitem"
              >
                <!-- KickoffLabs Compliance: Consolidated pink to purple (2-color palette) -->
                <div class="card demo-highlight bg-gradient-to-br from-purple-500/10 via-purple-500/5 to-transparent border-purple-500/30 hover:border-purple-400/50 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/25" style="padding: var(--card-padding);">
                  <div class="text-center" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
                    <!-- Step Number -->
                    <div class="relative">
                      <div class="w-20 h-20 mx-auto bg-gradient-to-br from-purple-500 to-purple-600 rounded-full flex items-center justify-center text-2xl font-bold text-white shadow-xl group-hover:scale-110 transition-transform duration-300">
                        <!-- KickoffLabs Compliance: Use CSS variable for z-index -->
                        <span class="relative" style="z-index: var(--z-content);">3</span>
                      </div>
                      <div class="absolute inset-0 w-20 h-20 mx-auto bg-purple-400 rounded-full animate-ping opacity-20"></div>
                    </div>
                    
                    <!-- Transformation Visual (3D Icon) -->
                    <div class="relative flex justify-center mb-4">
                      <IconRobot :size="64" />
                    </div>
                    
                    <!-- The Payoff (Consistent Spacing) -->
                    <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
                      <h3 class="text-xl font-bold text-white">Your AI Twin</h3>
                      <p class="text-sm text-purple-300 font-medium">AI-powered personality mirror</p>
                      <p class="text-secondary leading-relaxed">
                        Meet your digital reflection—an AI persona that thinks, talks, and reacts 
                        <strong class="text-white">exactly as your friends see you.</strong>
                      </p>
                    </div>
                    
                    <!-- Value Proposition (Aligned) -->
                    <div class="border-t border-purple-500/20" style="padding-top: var(--element-spacing);">
                      <div class="text-xs text-purple-400" style="display: flex; flex-direction: column; gap: var(--micro-spacing);">
                        <div class="flex justify-between items-center">
                          <span>Interaction:</span>
                          <span class="font-medium text-indigo-300">24/7 Available</span>
                        </div>
                        <div class="flex justify-between items-center">
                          <span>Growth:</span>
                          <span class="font-medium text-purple-300">Evolves with you</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Unique Value Proposition Section (Awebco: Social Proof + Differentiation) -->
          <div class="relative" style="margin-top: var(--section-spacing);">
            <div class="text-center" style="display: flex; flex-direction: column; gap: var(--section-spacing);">
              <!-- Competitive Advantage (Nielsen: Aesthetic and Minimalist Design) -->
              <div class="bg-gradient-to-r from-slate-800/50 to-slate-700/50 rounded-2xl border border-slate-600/50" style="padding: var(--subsection-spacing);">
                <div class="grid md:grid-cols-2 items-stretch" style="gap: var(--subsection-spacing);">
                  <!-- Problem Section (Centered Alignment) -->
                  <div class="text-center" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
                    <h3 class="text-2xl font-semibold text-white">The Problem with Self-Assessment</h3>
                    <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
                      <!-- KickoffLabs Compliance: Replaced red X marks with indigo/purple outline style -->
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 border-2 border-indigo-500/50 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-indigo-300 font-medium">MBTI Tests</div>
                          <div class="text-sm text-secondary">Only reflect your self-perception</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 border-2 border-indigo-500/50 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-indigo-300 font-medium">Personality Apps</div>
                          <div class="text-sm text-secondary">Generic, not personalized to you</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 border-2 border-indigo-500/50 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-indigo-300 font-medium">Asking Friends Directly</div>
                          <div class="text-sm text-secondary">People rarely give honest feedback</div>
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <!-- Solution Section (Centered Alignment) -->
                  <div class="text-center" style="display: flex; flex-direction: column; gap: var(--element-spacing);">
                    <h3 class="text-2xl font-semibold text-gradient">The Re:MirAI Advantage</h3>
                    <!-- KickoffLabs Compliance: Replaced green checkmarks with indigo/purple -->
                    <div style="display: flex; flex-direction: column; gap: var(--tight-spacing);">
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-indigo-300 font-medium">Anonymous Feedback</div>
                          <div class="text-sm text-secondary">Friends share honest perceptions safely</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 bg-purple-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-purple-300 font-medium">AI-Powered Synthesis</div>
                          <div class="text-sm text-secondary">Advanced analysis of multiple perspectives</div>
                        </div>
                      </div>
                      <div class="flex items-start space-x-3">
                        <!-- KickoffLabs Compliance: Replaced emoji with SVG icon -->
                        <div class="w-6 h-6 bg-indigo-500 rounded-full flex items-center justify-center mt-0.5">
                          <svg class="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
                          </svg>
                        </div>
                        <div>
                          <div class="text-indigo-300 font-medium">Interactive AI Persona</div>
                          <div class="text-sm text-secondary">Chat with your digital reflection</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Target Audience Connection (Concept: 10-20s Social Media Users) -->
              <!-- KickoffLabs Compliance: Consolidated pink to purple -->
              <div class="bg-gradient-to-r from-purple-500/10 to-purple-500/10 rounded-2xl border border-purple-500/30" style="padding: var(--subsection-spacing);">
                <div class="text-center" style="display: flex; flex-direction: column; gap: var(--card-spacing);">
                  <h3 class="text-2xl font-semibold text-white">Perfect for Gen Z & Millennials</h3>
                  <div style="display: flex; justify-content: center; width: 100%;">
                    <p class="text-lg text-secondary max-w-sm text-center" style="line-height: 1.6; text-align: center; margin: 0 auto;">
                      If you love personality tests, zodiac compatibility, or MBTI discussions, 
                      you'll be <strong class="text-gradient">obsessed</strong> with Re:MirAI.
                    </p>
                  </div>
                  
                  <!-- Viral Elements (Nielsen: Recognition rather than recall) -->
                  <div class="flex flex-wrap justify-center items-center" style="gap: var(--card-spacing);">
                    <div class="text-center" style="display: flex; flex-direction: column; gap: var(--text-spacing); align-items: center;">
                      <svg class="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"/>
                      </svg>
                      <div class="text-xs text-muted whitespace-nowrap">Shareable Results</div>
                    </div>
                    <div class="text-center" style="display: flex; flex-direction: column; gap: var(--text-spacing); align-items: center;">
                      <svg class="w-10 h-10 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                      </svg>
                      <div class="text-xs text-muted whitespace-nowrap">Social Discussion</div>
                    </div>
                    <div class="text-center" style="display: flex; flex-direction: column; gap: var(--text-spacing); align-items: center;">
                      <svg class="w-10 h-10 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"/>
                      </svg>
                      <div class="text-xs text-muted whitespace-nowrap">Viral Loop</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <!-- Value Proposition Section (Nielsen: Help users understand) -->
        <div class="relative" style="margin-top: var(--section-spacing);">
          <!-- KickoffLabs Compliance: Consolidated pink to purple -->
          <div class="bg-gradient-to-r from-indigo-500/5 via-purple-500/10 to-purple-500/5 rounded-3xl border border-indigo-500/20" style="padding: var(--subsection-spacing);">
            <div class="text-center" style="display: flex; flex-direction: column; gap: var(--subsection-spacing);">
              <h3 class="text-2xl md:text-3xl font-semibold text-white">
                Discover insights you never knew about yourself
              </h3>
              <p class="text-lg text-secondary max-w-2xl mx-auto leading-relaxed" style="margin: 0 auto;">
                Re:MirAI uses advanced AI to synthesize anonymous feedback from your friends, 
                creating a unique persona that reflects how others truly see you—not just how you see yourself.
              </p>
              
              <!-- Key Features (Nielsen: Recognition rather than recall) -->
              <div class="grid md:grid-cols-3" style="gap: var(--card-spacing);">
                <div class="text-center" style="display: flex; flex-direction: column; gap: var(--tight-spacing); align-items: center;">
                  <div class="w-16 h-16 bg-indigo-500/10 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8 text-indigo-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"/>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-white">Anonymous Feedback</h4>
                  <p class="text-sm text-secondary max-w-xs mx-auto">Friends share honest perceptions safely</p>
                </div>
                
                <div class="text-center" style="display: flex; flex-direction: column; gap: var(--tight-spacing); align-items: center;">
                  <div class="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"/>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-white">AI-Powered Analysis</h4>
                  <p class="text-sm text-secondary max-w-xs mx-auto">Advanced synthesis of multiple perspectives</p>
                </div>
                
                <div class="text-center" style="display: flex; flex-direction: column; gap: var(--tight-spacing); align-items: center;">
                  <!-- KickoffLabs Compliance: Consolidated pink to purple -->
                  <div class="w-16 h-16 bg-purple-500/10 rounded-2xl flex items-center justify-center">
                    <svg class="w-8 h-8 text-purple-300" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"/>
                    </svg>
                  </div>
                  <h4 class="font-semibold text-white">Interactive Persona</h4>
                  <p class="text-sm text-secondary max-w-xs mx-auto">Chat with your digital reflection anytime</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <!-- Enhanced CTA Section (Awebco: Single Primary CTA) -->
        <div class="relative" style="margin-top: var(--section-spacing);">
          <div class="text-center" style="display: flex; flex-direction: column; gap: var(--subsection-spacing);">
            <!-- Urgency/Scarcity Element -->
            <!-- KickoffLabs Compliance: Replaced green with indigo -->
            <div class="inline-flex items-center rounded-full text-indigo-300 text-sm font-medium" style="gap: var(--element-spacing); padding: var(--element-spacing) var(--card-spacing); background-color: rgb(99, 102, 241, 0.2); margin: 0 auto;">
              <div class="w-2 h-2 bg-indigo-400 rounded-full animate-pulse"></div>
              <span>Free during early access • Limited time</span>
            </div>
            
            <!-- Primary CTA -->
            <div style="display: flex; flex-direction: column; gap: var(--subsection-spacing);">
              <h3 class="text-3xl md:text-4xl font-bold text-white">
                Ready to see yourself through <span class="text-gradient">their eyes</span>?
              </h3>
              
              <div class="flex flex-col sm:flex-row items-center justify-center" style="gap: var(--element-spacing);">
                <Button 
                  size="lg" 
                  class="text-lg px-12 py-4 bg-gradient-to-r from-indigo-500 to-purple-600 hover:from-indigo-600 hover:to-purple-700 shadow-lg hover:shadow-xl hover:shadow-purple-500/25 transform hover:scale-105 transition-all duration-300" 
                  @click="goToLogin"
                  aria-describedby="primary-cta-description"
                >
                  <svg class="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                  </svg>
                  Begin Your Discovery
                </Button>
                
                <!-- Secondary CTA (Prismic: Limited Secondary Options) -->
                <Button 
                  variant="ghost" 
                  size="lg" 
                  class="text-lg px-8 py-4" 
                  @click="showLiveDemo"
                  aria-describedby="secondary-cta-description"
                >
                  <svg class="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"/>
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"/>
                  </svg>
                  See Live Demo
                </Button>
              </div>
              
              <!-- CTA Descriptions for Screen Readers -->
              <div class="sr-only">
                <div id="primary-cta-description">Start creating your AI persona by signing up with Google</div>
                <div id="secondary-cta-description">Watch a live demonstration of the persona creation process</div>
              </div>
              
              <!-- Trust Signals (Centered & Balanced) -->
              <div class="flex flex-wrap items-center justify-center text-xs text-muted" style="gap: var(--element-spacing); margin-top: var(--element-spacing);">
                <div class="flex items-center" style="gap: var(--text-spacing);">
                  <!-- KickoffLabs Compliance: Replaced green with indigo -->
                <svg class="w-4 h-4 text-indigo-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2l2.09 6.26L20 10l-5.91 1.74L12 22l-2.09-6.26L4 14l5.91-1.74L12 2z"/>
                  </svg>
                  <span>Free to start</span>
                </div>
                <div class="flex items-center" style="gap: var(--text-spacing);">
                  <!-- KickoffLabs Compliance: Replaced blue with purple -->
                <svg class="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                  </svg>
                  <span>Privacy protected</span>
                </div>
                <div class="flex items-center" style="gap: var(--text-spacing);">
                  <svg class="w-4 h-4 text-purple-400" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                  </svg>
                  <span>No spam, ever</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Button from '@/components/common/Button.vue'
import IconMirror from '@/components/icons/IconMirror.vue'
import IconChat from '@/components/icons/IconChat.vue'
import IconRobot from '@/components/icons/IconRobot.vue'

const router = useRouter()

const goToLogin = () => {
  router.push('/login')
}

const scrollToHowItWorks = () => {
  const element = document.getElementById('how-it-works')
  element?.scrollIntoView({ behavior: 'smooth' })
}

const showLiveDemo = () => {
  // Show a quick demo modal or navigate to a demo page
  // For now, scroll to the how-it-works section with enhanced focus
  const element = document.getElementById('how-it-works')
  element?.scrollIntoView({ behavior: 'smooth', block: 'center' })
  
  // Add visual emphasis
  setTimeout(() => {
    const cards = document.querySelectorAll('.demo-highlight')
    cards.forEach((card, index) => {
      setTimeout(() => {
        card.classList.add('ring-4', 'ring-indigo-400', 'ring-opacity-50')
        setTimeout(() => {
          card.classList.remove('ring-4', 'ring-indigo-400', 'ring-opacity-50')
        }, 2000)
      }, index * 500)
    })
  }, 500)
}
</script>