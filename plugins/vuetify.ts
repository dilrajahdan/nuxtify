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
            primary: '#2563eb',
            secondary: '#E5E7EB',
            surface: '#FFFFFF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F9FAFB',
            'on-surface-variant': '#64748b'
          }
        }
      }
    },
    defaults: {
      VBtn: {
        variant: 'flat',
        color: 'primary',
        class: 'text-body-1 font-weight-medium'
      },
      VCard: {
        variant: 'flat',
        color: 'surface',
        class: 'border rounded-lg'
      },
      VContainer: {
        class: 'px-6'
      },
      VAppBar: {
        elevation: 0,
        class: 'px-0'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
}) 