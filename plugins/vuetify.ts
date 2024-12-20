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
            'on-surface-variant': '#94A3B8'
          }
        }
      }
    },
    defaults: {
      VBtn: {
        variant: 'flat',
        color: 'primary',
        class: 'text-body-1 font-weight-regular text-none rounded-lg',
        elevation: 0,
        height: '56px',
        minWidth: '120px'
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: '#F8FAFC',
        class: 'rounded-lg input-field',
        hideDetails: 'auto',
        persistentPlaceholder: true
      },
      VTextarea: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: '#F8FAFC',
        class: 'rounded-lg input-field',
        hideDetails: 'auto',
        persistentPlaceholder: true
      },
      VSelect: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: '#F8FAFC',
        class: 'rounded-lg input-field',
        hideDetails: 'auto',
        persistentPlaceholder: true
      },
      VCard: {
        variant: 'flat',
        color: 'surface',
        class: 'pa-8 rounded-xl',
        elevation: 0
      },
      VContainer: {
        class: 'px-6 container-width'
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