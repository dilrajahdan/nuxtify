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
            'primary-lighten': '#EEF2FF',
            'primary-hover': '#6B84F8',
            'card-border': '#E5E7EB',
            surface: '#FFFFFF',
            error: '#FF5252',
            info: '#2196F3',
            success: '#4CAF50',
            warning: '#FFC107',
            background: '#F9FAFB',
            'on-surface-variant': '#94A3B8',
            'grey-lighten': '#F8FAFC',
            'section-border': '#E2E8F0',
            'text-medium': '#64748B'
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
        class: 'rounded-xl dashboard-card',
        elevation: 1,
        hover: true,
      },
      VList: {
        class: 'pa-0 bg-transparent',
        elevation: 0
      },
      VListItem: {
        class: 'mb-3 rounded-lg dashboard-list-item',
        elevation: 0,
        rounded: true,
      },
      VTextField: {
        variant: 'outlined',
        density: 'comfortable',
        color: 'primary',
        bgColor: 'white',
        class: 'rounded-lg field-border',
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
        class: 'font-weight-medium text-primary'
      },
      VCardTitle: {
        class: 'text-h5 font-weight-medium py-6 px-6 card-header',
        style: 'background: linear-gradient(to bottom, white, #f8fafc)'
      },
      VCardText: {
        class: 'pa-6'
      }
    }
  })

  nuxtApp.vueApp.use(vuetify)
}) 