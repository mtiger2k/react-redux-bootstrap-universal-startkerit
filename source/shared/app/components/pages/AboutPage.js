import React from 'react';
import PageWrapper from '../../../lib/page/PageWrapper';
import PageHeader from '../../../lib/page/PageHeader';
import Breadcrumb from '../../../lib/page/Breadcrumb';
import PageContent from '../../../lib/page/PageContent';
import Box from '../../../lib/widgets/Box';

export default function AboutPage() {
  return (
    <PageWrapper>
      <PageHeader
        title="About page"
        description=""
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'About' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <p>
            This app is designed to work as either a client- or
            a server-rendered app. It's also designed to be
            deployed to the cloud.
          </p>
      </PageContent>
    </PageWrapper>
  );
}
