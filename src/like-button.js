import React from 'react';
//import NavbarCollapse from 'react-bootstrap/esm/NavbarCollapse';



export class LikeButton extends React.Component {
  constructor(props) {
    super(props);
    this.state = { liked: false, likeCount: 0 };
  }

  getLikeButtonClass() {
    if (this.state.liked) {
      return "fa fa-thumbs-up text-success";
    } else {
      return "fa fa-thumbs-up black";
    }
  }

  toggleLiked() {
    this.setState(prevState => ({
      liked: !prevState.liked,
      likeCount: !prevState.liked ? 1 : 0
    }));
  }

  getLikeText() {
    if (this.state.likeCount > 0) {
      return <span className="badge badge-primary">{ this.state.likeCount }</span>;
    } else 
      return "";
  }

  render() {
    //if (this.state.liked) {
      return (
        <><button onClick={() => this.toggleLiked() } className="btn btn-link" ><span className={this.getLikeButtonClass()}></span> </button>{ this.getLikeText() }</>
      );
      
      //'You liked comment number ' + this.props.commentID;
    //}
/*
    return e(
      'button',
      { onClick: () => this.setState({ liked: true }) },
      'Like'
    ); */
  }
}



// Find all DOM containers, and render Like buttons into them.
/*
document.querySelectorAll('.like_button_container')
  .forEach(domContainer => {
    // Read the comment ID from a data-* attribute.
    const commentID = parseInt(domContainer.dataset.commentid, 10);
    ReactDOM.render(
      e(LikeButton, { commentID: commentID }),
      domContainer
    );
  });
  */