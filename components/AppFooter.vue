<template>
  <v-footer class="bg-surface py-16">
    <v-container>
      <v-row>
        <!-- Logo and Description -->
        <v-col cols="12" md="4" class="pr-md-12">
          <div class="d-flex align-center mb-6">
            <img src="/logo.png" alt="Logo" height="24" class="mr-2" />
            <span class="text-body-1 font-weight-medium">Nuxtify</span>
          </div>
          <p class="text-body-2 text-medium-emphasis mb-6">
            A modern Nuxt.js starter template for building production-ready SaaS applications.
          </p>
          <div class="d-flex gap-4">
            <v-btn icon variant="text" href="https://github.com" target="_blank">
              <v-icon>mdi-github</v-icon>
            </v-btn>
            <v-btn icon variant="text" href="https://twitter.com" target="_blank">
              <v-icon>mdi-twitter</v-icon>
            </v-btn>
            <v-btn icon variant="text" href="https://discord.com" target="_blank">
              <v-icon>mdi-discord</v-icon>
            </v-btn>
          </div>
        </v-col>

        <!-- Navigation Links -->
        <v-col cols="6" md="2">
          <h3 class="text-body-1 font-weight-bold mb-4">Product</h3>
          <div class="d-flex flex-column gap-2">
            <v-btn variant="text" to="/features" class="text-body-2 justify-start px-0">Features</v-btn>
            <v-btn variant="text" to="/docs" class="text-body-2 justify-start px-0">Documentation</v-btn>
            <v-btn variant="text" to="/guides" class="text-body-2 justify-start px-0">Guides</v-btn>
            <v-btn variant="text" to="/api" class="text-body-2 justify-start px-0">API Reference</v-btn>
          </div>
        </v-col>

        <v-col cols="6" md="2">
          <h3 class="text-body-1 font-weight-bold mb-4">Company</h3>
          <div class="d-flex flex-column gap-2">
            <v-btn variant="text" to="/about" class="text-body-2 justify-start px-0">About</v-btn>
            <v-btn variant="text" to="/blog" class="text-body-2 justify-start px-0">Blog</v-btn>
            <v-btn variant="text" to="/careers" class="text-body-2 justify-start px-0">Careers</v-btn>
            <v-btn variant="text" to="/contact" class="text-body-2 justify-start px-0">Contact</v-btn>
          </div>
        </v-col>

        <v-col cols="6" md="2">
          <h3 class="text-body-1 font-weight-bold mb-4">Legal</h3>
          <div class="d-flex flex-column gap-2">
            <v-btn variant="text" to="/privacy" class="text-body-2 justify-start px-0">Privacy</v-btn>
            <v-btn variant="text" to="/terms" class="text-body-2 justify-start px-0">Terms</v-btn>
            <v-btn variant="text" to="/security" class="text-body-2 justify-start px-0">Security</v-btn>
          </div>
        </v-col>
      </v-row>

      <v-divider class="my-8" />

      <div class="d-flex flex-column flex-md-row justify-space-between align-center text-center text-md-left">
        <div class="text-body-2 text-medium-emphasis mb-4 mb-md-0">
          &copy; {{ new Date().getFullYear() }} Nuxtify. All rights reserved.
        </div>
        <div class="d-flex gap-4">
          <v-btn variant="text" to="/privacy" class="text-body-2">Privacy Policy</v-btn>
          <v-btn variant="text" to="/terms" class="text-body-2">Terms of Service</v-btn>
        </div>
      </div>
    </v-container>
  </v-footer>
</template> 