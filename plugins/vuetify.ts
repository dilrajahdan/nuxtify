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
            primary: '#4F6EF7',
            secondary: '#F3F4F6',
            surface: '#FFFFFF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F9FAFB',
            'on-surface-variant': '#94A3B8',
            'grey-lighten': '#F8FAFC',
            'border-color': '#E2E8F0'
          }
        }
      }
    },
    defaults: {
      VDialog: {
        width: '800',
        scrollable: true,
        persistent: true,
        class: 'v-dialog--email-composer'
      },
      VToolbar: {
        color: 'white',
        class: 'px-6 py-4',
        flat: true,
        density: 'comfortable'
      },
      VCard: {
        variant: 'flat',
        color: 'surface',
        class: 'rounded-xl',
        elevation: 0
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: 'white',
        class: 'rounded-lg',
        hideDetails: 'auto'
      },
      VTextarea: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: 'white',
        class: 'rounded-lg',
        hideDetails: 'auto'
      },
      VBtn: {
        variant: 'flat',
        class: 'text-none rounded-lg font-weight-medium',
        elevation: 0,
        height: '48px'
      },
      VChip: {
        variant: 'flat',
        size: 'small',
        class: 'font-weight-medium'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
}) 