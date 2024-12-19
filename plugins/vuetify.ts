import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

export default defineNuxtPlugin((nuxtApp) => {
  const vuetify = createVuetify({
    ssr: true,
    components,
    directives,
    theme: {
      defaultTheme: 'light',
      themes: {
        light: {
          colors: {
            primary: '#0066FF',
            secondary: '#F3F4F6',
            surface: '#FFFFFF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F9FAFB',
            'on-surface-variant': '#6B7280'
          }
        }
      }
    },
    defaults: {
      VBtn: {
        variant: 'flat',
        color: 'primary',
        class: 'text-body-1 font-weight-medium text-none rounded-lg',
        elevation: 0,
        height: '48px',
        minWidth: '120px'
      },
      VBtnGroup: {
        rounded: 'lg',
        elevation: 0,
        class: 'border-thin'
      },
      VCard: {
        variant: 'flat',
        color: 'surface',
        class: 'pa-8 rounded-lg',
        elevation: 0
      },
      VContainer: {
        class: 'px-6 container-width'
      },
      VAppBar: {
        elevation: 0,
        class: 'px-0 border-b',
        height: '72px'
      },
      VRow: {
        class: 'mx-0 gap-y-8'
      },
      VCol: {
        class: 'px-6'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
}) 