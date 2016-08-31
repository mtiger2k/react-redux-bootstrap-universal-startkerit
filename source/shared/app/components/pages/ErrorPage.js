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
        title="Error page"
        description=""
      >
        <Breadcrumb
          items={[
            { key: 1, icon: 'fa fa-home', title: 'Home', url: '/' },
            { key: 2, title: 'Error' },
          ]}
        />
      </PageHeader>
      <PageContent>
        <p>
            Error
          </p>
      </PageContent>
    </PageWrapper>
  );
}
