import React, { JSX } from "react";
import PageHeader from "@/components/generic/page-header";
import CTAButton from "@/components/generic/cta-button";
import ThemeToggle from "@/components/generic/theme-toggle";
import TableOfContents from "@/components/generic/toc";
import Header from "@/components/project/header";
import Footer from "@/components/project/footer";
import InfoBox from "@/components/generic/info-box";

export type ComponentData = {
  title: string;
  description: string | null;
  demo: JSX.Element | null;
  code: string;
};

type ComponentDataStructure = {
  genericComponents: Record<string, ComponentData>;
  projectComponents: Record<string, ComponentData>;
};

export const COMPONENT_DATA: ComponentDataStructure = {
  genericComponents: {
    // PageHeader
    pageheader: {
      title: "PageHeader",
      description:
        "The PageHeader component is used to display a page header with a title, subtitle, and description.",
      demo: (
        <PageHeader
          title="Example Title"
          subTitle="Optional Subtitle"
          subTitleLink="#"
          description="This is an example description."
        >
          <CTAButton href="#">Action Button</CTAButton>
        </PageHeader>
      ),
      code: `<PageHeader
  title="Example Title"
  subTitle="Optional Subtitle"
  subTitleLink="#"
  description="This is an example description."
>
  <CTAButton href="#">Action Button</CTAButton>
</PageHeader>`,
    },
    ctabutton: {
      title: "CTAButton",
      description: null,
      demo: (
        <div className="flex gap-4">
          <CTAButton href="#">Default Button</CTAButton>
          <CTAButton href="#" variant="secondary">
            Secondary Button
          </CTAButton>
          <CTAButton
            href="#"
            className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-white"
          >
            Custom Style
          </CTAButton>
        </div>
      ),
      code: `<CTAButton href="#">Default Button</CTAButton>
<CTAButton href="#" variant="secondary">Secondary Button</CTAButton>
<CTAButton href="#" className="bg-pink-600 hover:bg-pink-700 dark:bg-pink-500 dark:hover:bg-pink-600 dark:text-white">
  Custom Style
</CTAButton>`,
    },
    // ThemeToggle
    themetoggle: {
      title: "ThemeToggle",
      description: null,
      demo: <ThemeToggle />,
      code: "<ThemeToggle />",
    },
    // FloatingNav
    floatingnav: {
      title: "FloatingNav",
      description:
        "The FloatingNav component appears when scrolling down the page. See it in action by scrolling this page.",
      demo: null,
      code: `<FloatingNav items={{
  'Section 1': [
    { id: 'item1', label: 'Item 1' },
    { id: 'item2', label: 'Item 2' }
  ],
  'Section 2': [
    { id: 'item3', label: 'Item 3' }
  ]
}} />`,
    },
    // TableOfContents
    tableofcontents: {
      title: "TableOfContents",
      description: null,
      demo: (
        <TableOfContents
          items={{
            "Example Section": [
              { id: "example1", label: "Example Item 1" },
              { id: "example2", label: "Example Item 2" },
            ],
          }}
        />
      ),
      code: `<TableOfContents items={{
  'Example Section': [
    { id: 'example1', label: 'Example Item 1' },
    { id: 'example2', label: 'Example Item 2' }
  ]
}} />`,
    },
    // ScrollIndicator
    scrollindicator: {
      title: "ScrollIndicator",
      description:
        "The ScrollIndicator component shows reading progress at the top of the page. See it in action as you scroll this page.",
      demo: null,
      code: "<ScrollIndicator />",
    },
    // InfoBox
    infobox: {
      title: "InfoBox",
      description:
        "The InfoBox component is used to display content in a styled container with consistent padding and background.",
      demo: (
        <InfoBox>
          <p>This is an example of content inside an InfoBox component.</p>
          <p className="mt-4">
            It can contain multiple paragraphs and other elements.
          </p>
        </InfoBox>
      ),
      code: `<InfoBox>
  <p>This is an example of content inside an InfoBox component.</p>
  <p className="mt-4">It can contain multiple paragraphs and other elements.</p>
</InfoBox>`,
    },
  },
  projectComponents: {
    // Header
    header: {
      title: "Header",
      description:
        "The Header component is used to display a header with a logo, navigation links, theme toggle, and a CTA button.",
      demo: <Header />,
      code: "<Header />",
    },
    // Footer
    footer: {
      title: "Footer",
      description:
        "The Footer component is used to display a footer with a company name and navigation links.",
      demo: <Footer />,
      code: "<Footer />",
    },
  },
};
