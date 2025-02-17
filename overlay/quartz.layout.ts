import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header:    [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      "Home":     "/",
      "Contact":  "/#contact",
      "RSS Feed": "/some-remarks/index.xml"
    }
  })
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  header: [
    Component.Breadcrumbs({
      spacerSymbol: "/",
      rootName:     "Delphi Foresight Strategy",
      hideOnRoot:   false
    }),
    Component.Spacer(),
    Component.Darkmode(),
    Component.Search()
  ],
  beforeBody: [
    Component.ContentMeta(),
    Component.TagList()
  ],
  afterBody: [
    Component.Backlinks()
  ],
  left: [],
  right: [
    Component.Graph(),
    Component.DesktopOnly(Component.TableOfContents())
  ]
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  header: [
    Component.Breadcrumbs({
      spacerSymbol: "/",
      rootName:     "Delphi Foresight Strategy",
      hideOnRoot:   false
    }),
    Component.Spacer(),
    Component.Darkmode(),
    Component.Search()
  ],
  beforeBody: [],
  afterBody: [],
  left: [],
  right: []
}
