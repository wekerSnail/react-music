import React, { Component } from 'react';
import MusiclistItem from '../component/musicListItem';
import { MUSIC_LIST} from  '../config/musiclist'
class Musiclist extends Component {

  constructor(props) {
    super(props)
  }

  render() {

    let listElements = this.props.musicList.map((item) => {
      return (
        <MusiclistItem
          focus={item== this.props.currentMusicItem}
          key={item.id}
          musicItem={item}
        />
      );
    });

    return (
      <div>
        <ul>
          {listElements}
        </ul>
      </div>
    );
  }

}

export default Musiclist;
