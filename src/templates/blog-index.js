import { Link, graphql } from 'gatsby';
import { formatPostDate, formatReadingTime } from '../utils/helpers';

import Bio from '../components/Bio';
import Layout from '../components/Layout';
import React from 'react';
import SEO from '../components/SEO';
import get from 'lodash/get';
import { rhythm } from '../utils/typography';

class BlogIndexTemplate extends React.Component {
  render() {
    const siteTitle = get(this, 'props.data.site.siteMetadata.title');
    console.log('siteTitle', siteTitle)
    const posts = get(this, 'props.data.allMarkdownRemark.edges');
    return (
      <Layout location={this.props.location} title={siteTitle}>
        <SEO />
        <aside>
          <Bio />
        </aside>
        <main>
          {posts.map(({ node }) => {
            const title = get(node, 'frontmatter.title') || node.fields.slug;
            return (
              <article key={node.fields.slug}>
                <header>
                  <h3
                    style={{
                      fontFamily: 'CustomFont',
                      fontSize: rhythm(1),
                      marginBottom: rhythm(1 / 4),
                    }}
                  >
                    <Link
                      style={{ boxShadow: 'none', fontFamily: 'CustomFont' }}
                      to={node.fields.slug}
                      rel="bookmark"
                    >
                      {title}
                    </Link>
                  </h3>
                  <small
                    style={{ boxShadow: 'none', fontFamily: 'CustomFont' }}
                  >
                    {formatPostDate(node.frontmatter.date)}
                    {/* {` • ${formatReadingTime(node.timeToRead)}`} */}
                  </small>
                </header>
                <span
                  style={{
                    width: '100%',
                    boxShadow: 'none',
                    fontFamily: 'CustomFont',
                  }}
                  dangerouslySetInnerHTML={{ __html: node.frontmatter.tag }}
                />
              </article>
            );
          })}
        </main>
        {/* <Footer /> */}
      </Layout>
    );
  }
}

export default BlogIndexTemplate;

export const pageQuery = graphql`
  query($langKey: String!) {
    site {
      siteMetadata {
        title
        description
      }
    }
    allMarkdownRemark(
      filter: { fields: { langKey: { eq: $langKey } } }
      sort: { fields: [frontmatter___date], order: DESC }
    ) {
      edges {
        node {
          fields {
            slug
            langKey
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
            spoiler
            tag
          }
        }
      }
    }
  }
`;
