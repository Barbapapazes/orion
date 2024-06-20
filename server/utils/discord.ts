import type { H3Event } from 'h3'

type Level = 'success' | 'error' | 'info' | 'warning'

export function sendDiscordNotification(event: H3Event, title: string, options: { level: Level, message?: string } = { level: 'info' }) {
  const runtimeConfig = useRuntimeConfig(event)
  const webhookUrl = runtimeConfig.discordWebhookUrl

  if (!webhookUrl) {
    return
  }

  const { level } = options

  const color = levelToColor(level)
  const endpoint = getRequestURL(event)
  const environment = runtimeConfig.hub.env

  // https://developers.cloudflare.com/workers/runtime-apis/context/#waituntil
  event.context.waitUntil($fetch(webhookUrl, {
    method: 'POST',
    body: {
      username: 'Orion',
      embeds: [{
        title: `${title}`,
        description: options.message,
        color,
        fields: [
          {
            name: 'Environment',
            value: environment,
          },
          {
            name: 'Endpoint',
            value: endpoint,
          },
        ],
      }],
    },
  }).catch(() => {
    // Ignore errors
  }))
}

function levelToColor(level: Level) {
  switch (level) {
    case 'success':
      return 0x2ecc71
    case 'error':
      return 0xe74c3c
    case 'info':
      return 0x3498db
    case 'warning':
      return 0xf1c40f
  }
}
