import React, { Component } from 'react';
import AutoSuggest from 'react-autosuggest';

export default class Search extends Component {
  constructor() {
    super();
  }

  handleRenderItem(item) {
    return (
      <div key={item.id} id={item.id}>{item.title}</div>
    );
  }

  render() {
    const inputProps = {
      placeHolder: 'Buscar canción...',
      value: this.props.autoCompleteValue,
      onChange: this.props.handleChange
    };

    return (
      <div class="ui form">
        <AutoSuggest
          suggestions={this.props.tracks}
          getSuggestionValue={this.props.handleSelect}
          renderSuggestion={this.handleRenderItem.bind(this)}
          inputProps={inputProps}/>
      </div>
    );
  }
}
