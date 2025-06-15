import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4.0 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle:           "Delphi Foresight Strategy",
    pageTitleSuffix:     " :: Delphi Foresight Strategy",
    enableSPA:           false,
    enablePopovers:      false,
    analytics:           null,
    locale:              "en-US",
    baseUrl:             "delphi-strategy.com/some-remarks",
    ignorePatterns:      [],
    defaultDateType:     "created",
    generateSocialImages: true,
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Noto Sans",
        body:   "Noto Sans",
        code:   "Noto Sans Mono"
      },
      colors: {
        lightMode: {
          light:         "hsla( 0,   0%, 100%, 100%)", // --color-base-00     = #ffffff
          lightgray:     "hsla( 0,   0%,  88%, 100%)", // --color-base-30     = #e0e0e0
          gray:          "hsla( 0,   0%,  83%, 100%)", // --color-base-35     = #d4d4d4
          darkgray:      "hsla( 0,   0%,  13%, 100%)", // --color-base-100    = #222222
          dark:          "hsla( 0,   0%,  13%, 100%)", // --color-base-100    = #222222
          secondary:     "hsla(30, 100%,  46%, 100%)", // --color-accent      = hsl(var(--accent-h), var(--accent-s), var(--accent-l))
          tertiary:      "hsla(27, 100%,  53%, 100%)", // --color-accent-2    = hsl(calc(var(--accent-h) - 3), calc(var(--accent-s) * 1.02), calc(var(--accent-l) * 1.15))
          highlight:     "hsla(30, 100%,  46%,  10%)", // --tag-background    = hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.1)
          textHighlight: "hsla(49, 100%,  50%,  40%)"  // --text-highlight-bg = rgba(255, 208, 0, 0.4)
        },
        darkMode: {
          light:         "hsla( 0,   0%,  12%, 100%)", // --color-base-00     = #1e1e1e
          lightgray:     "hsla( 0,   0%,  21%, 100%)", // --color-base-30     = #363636
          gray:          "hsla( 0,   0%,  25%, 100%)", // --color-base-50     = #3f3f3f
          darkgray:      "hsla( 0,   0%,  85%, 100%)", // --color-base-100    = #dadada
          dark:          "hsla( 0,   0%,  85%, 100%)", // --color-base-100    = #dadada
          secondary:     "hsla(31,  79%,  50%, 100%)", // --color-accent      = hsl(var(--accent-h), var(--accent-s), var(--accent-l))
          tertiary:      "hsla(26,  83%,  64%, 100%)", // --color-accent-2    = hsl(calc(var(--accent-h) - 5), calc(var(--accent-s) * 1.05), calc(var(--accent-l) * 1.29))
          highlight:     "hsla(31,  79%,  50%,  10%)", // --tag-background    = hsla(var(--accent-h), var(--accent-s), var(--accent-l), 0.1)
          textHighlight: "hsla(49, 100%,  50%,  40%)"  // --text-highlight-bg = rgba(255, 208, 0, 0.4)
        }
      }
    }
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: [
          "frontmatter",
          "filesystem"
        ]
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "light-plus",
          dark:  "dark-plus"
        },
        keepBackground: false
      }),
      Plugin.ObsidianFlavoredMarkdown({
        enableInHtmlEmbed: true
      }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.HardLineBreaks(),
      Plugin.TableOfContents({
        maxDepth: 6
      }),
      Plugin.CrawlLinks({
        markdownLinkResolution: "shortest",
        prettyLinks:            false,
        openLinksInNewTab:      true,
        lazyLoad:               true
      }),
      Plugin.Description(),
      Plugin.Latex({
        renderEngine: "mathjax"
      })
    ],
    filters: [
      Plugin.RemoveDrafts()
    ],
    emitters: [
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage({
        sort: (a, b) => {
          let isJournalTag = /^Journal(\/.+)?$/

          let aComparisonString = a.frontmatter?.title ?? ""
          let bComparisonString = b.frontmatter?.title ?? ""

          if ((a.frontmatter?.tags?.some(tag => isJournalTag.test(tag))) && (b.frontmatter?.tags?.some(tag => isJournalTag.test(tag)))) {
            aComparisonString = a.frontmatter.date ?? aComparisonString
            bComparisonString = b.frontmatter.date ?? bComparisonString
          }

          aComparisonString = aComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()
          bComparisonString = bComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()  

          return aComparisonString.localeCompare(bComparisonString, undefined, {
            numeric: true,
            sensitivity: "base",
            ignorePunctuation: true
          })
        }
      }),
      Plugin.TagPage({
        sort: (a, b) => {
          let isJournalTag = /^Journal(\/.+)?$/

          let aComparisonString = a.frontmatter?.title ?? ""
          let bComparisonString = b.frontmatter?.title ?? ""

          if ((a.frontmatter?.tags?.some(tag => isJournalTag.test(tag))) && (b.frontmatter?.tags?.some(tag => isJournalTag.test(tag)))) {
            aComparisonString = a.frontmatter.date ?? aComparisonString
            bComparisonString = b.frontmatter.date ?? bComparisonString
          }

          aComparisonString = aComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()
          bComparisonString = bComparisonString.toLowerCase().replace(/(^| )(a|an|the)( |$)/g, " ").replace(/\([^\)]*\)/g, " ").replace(/ +/g, " ").trim()

          return aComparisonString.localeCompare(bComparisonString, undefined, {
            numeric: true,
            sensitivity: "base",
            ignorePunctuation: true
          })
        }
      }),
      Plugin.ContentIndex({
        rssLimit:          1024,
        rssFullHtml:       true,
        includeEmptyFiles: false
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages()
    ]
  }
}

export default config
