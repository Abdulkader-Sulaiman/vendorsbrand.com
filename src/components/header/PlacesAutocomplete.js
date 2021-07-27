import React from "react";
/* global google */
import ImageSlider from '../../Products/ImageSlider';

 export default  class SearchBar extends React.Component {
  constructor(props) {
    super(props);
    this.autocompleteInput = React.createRef();
    this.autocomplete = null;
    this.handlePlaceChanged = this.handlePlaceChanged.bind(this);

} 

  componentDidMount() {
    this.autocomplete = new google.maps.places.Autocomplete(this.autocompleteInput.current,
        {"types": ["geocode"]});
    this.autocomplete.addListener('place_changed', this.handlePlaceChanged);
  }

  handlePlaceChanged(){
    const place = this.autocomplete.getPlace();
    // this.props.onPlaceLoaded(place);
  }


  render() {

    // this.state.posts.map(({id, post })=> (
    //     post.Store_location == Location &&(
    //         <ImageSlider 
    //             key={id}
    //             userId={post.userId}
    //             description={post.description} 
    //             price={post.Price} 
    //             productName={post.productName}
    //             imageUrl={post.images}
    //             docID={post.docID}
    //             Brandname={post.Brandname}
    //             Location={post.Store_location}
    //             />
    //        ) 
    //        )
    //     )
    
    return (
        <input ref={this.autocompleteInput} id="autocomplete" placeholder="Enter your address"
         type="text"></input>
    );
  }
}