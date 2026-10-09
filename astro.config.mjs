import { defineConfig } from 'astro/config';
import icon from 'astro-icon';

// https://astro.build/config
export default defineConfig({
  site: 'https://dpatrongomez.github.io',
  integrations: [
    // Iconos autoalojados: solo se incluyen en el build los iconos listados aquí.
    icon({
      include: {
        'fa6-solid': [
          'arrow-right', 'arrow-left', 'arrow-up', 'arrow-up-right-from-square', 'arrow-right-arrow-left',
          'basket-shopping', 'box-archive', 'bars', 'briefcase', 'building-columns', 'bus',
          'chart-column', 'charging-station', 'circle-check', 'code', 'diagram-project', 'envelope',
          'folder-open', 'globe', 'graduation-cap', 'headset', 'house', 'list-check', 'location-dot',
          'map-location-dot', 'microchip', 'mobile-screen', 'network-wired', 'server', 'tag',
          'tower-broadcast', 'user', 'xmark', 'bolt',
        ],
        'fa6-regular': ['calendar', 'clock'],
        'fa6-brands': [
          'android', 'angular', 'dart-lang', 'ember', 'flutter', 'git-alt', 'github', 'google-play',
          'html5', 'java', 'jira', 'js', 'linkedin', 'php', 'python', 'telegram',
        ],
        devicon: ['firebase', 'githubactions', 'mysql'],
      },
    }),
  ],
});
