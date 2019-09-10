import React from "react"
import { graphql, StaticQuery } from "gatsby"
import PropTypes from "prop-types"
import Post from "../components/post"
import { Typography } from "@material-ui/core"

class BlogRoll extends React.Component {
  render() {
    const { data } = this.props
    const posts = data.allMarkdownRemark.edges
    return (
      <div>
        <Typography
          variant="h4"
          component="h2"
          style={{ fontWeight: "300", color: "#FAFFF7" }}
        >
          Latest Posts
        </Typography>
        {posts &&
          posts.map(({ node }) => {
            return (
              <div key={node.id} style={{ marginTop: "50px" }}>
                <Post path={node.fields.slug} info={node} />
              </div>
            )
          })}
      </div>
    )
  }
}

// propTypes allows us to define what type we expect the props to be.
// If the props do not conform to their expected type, we will be able
// to see a warning in the browser's developers tools.
BlogRoll.propTypes = {
  data: PropTypes.shape({
    allMarkdownRemark: PropTypes.shape({
      edges: PropTypes.array,
    }),
  }),
}

// StaticQuery must be used in all components outside the pages directory.
// These static GraphQL queries can be placed anywhere in the codebase.
export default () => (
  <StaticQuery
    query={graphql`
      query BlogRollQuery {
        allMarkdownRemark(
          sort: { order: DESC, fields: [frontmatter___date] }
          filter: { frontmatter: { templateKey: { eq: "blog-post" } } }
        ) {
          edges {
            node {
              excerpt(pruneLength: 200)
              id
              fields {
                slug
              }
              frontmatter {
                title
                templateKey
                date(formatString: "MMMM DD, YYYY")
              }
            }
          }
        }
      }
    `}
    render={data => <BlogRoll data={data} />}
  />
)
