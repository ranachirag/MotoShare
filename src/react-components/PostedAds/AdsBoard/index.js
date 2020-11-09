import React from 'react'

import './style.css'
import Ads from './Ads'
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import easyScroll from 'easy-scroll';

/* Overall Component that shows Information about Ads */
class AdsBoard extends React.Component {

  constructor(props) {
    super(props);

    // React Ref is created here for animating scroll purposes
    this.adRef = React.createRef();

    const { ads, saleInfo } = this.props 
    this.state = {
      ads: ads,
      saleInfo : saleInfo
    }
  }

  /* Updates Ad Info display below carousal */
  updateAdInfo = (id) => {
    this.updateAdDetails(id)
    this.updateSaleInfo(id)
  }

  /* Updates Ad Details display below carousal */
  updateAdDetails = (id) => {

    if (id===-1){
      document.getElementById("adDetails").innerHTML = ''
    } else {
      const ad = this.state.ads[id]
      let adInfoDisplay = (`<h2>Name: </h2><span id="adTextInfo">${ad.name}</span>`) 
      adInfoDisplay += (`<h2>Price: </h2><span id="adTextInfo">$ ${ad.price} / day</span>`)
      adInfoDisplay += (`<h2>Rating: </h2><span id="adTextInfo">${ad.rating} / 5.0</span>`)
      adInfoDisplay += (`<h2>Description: </h2><span id="adTextInfo"> ${ad.description}</span>`)
      document.getElementById("adDetails").innerHTML = adInfoDisplay
    }

  }

  /* Updates Sale Info display below carousal */
  updateSaleInfo = (id) => {
    if (id===-1){
      document.getElementById("saleInfo").innerHTML = ''
    } else {
      const saleInfo = this.state.saleInfo[id]
      let saleInfoDisplay = `<h2>Number of Times Rented: </h2><span id="adTextInfo">${saleInfo.numSold} times</span>`
      saleInfoDisplay += (`<h2>Number of Days Rented: </h2><span id="adTextInfo">${saleInfo.totalDays} days</span>`)
      saleInfoDisplay += (`<h2>Total Tips: </h2><span id="adTextInfo">$ ${saleInfo.totalTips} </span>`)
      saleInfoDisplay += (`<h2>Total Earnings: </h2><span id="adTextInfo">$ ${saleInfo.totalEarnings} </span>`)
      document.getElementById("saleInfo").innerHTML = saleInfoDisplay
    }

  }

  /* Updates Ad Details display below carousal */
  deleteAd = (id) => {

    // SERVER CALL to remove ad here

    const adsToKeep = this.state.ads.filter((ad) => ad.id !== id)
    this.state.ads = adsToKeep

    if (adsToKeep.length==0) {
      this.updateAdDetails(-1)
    } else {
      this.updateAdDetails(0)
    }
    
    const salesToKeep = this.state.ads.filter((sale) => sale.id !== id)
    this.state.saleInfo = salesToKeep

    if (salesToKeep.length==0) {
      this.updateSaleInfo(-1)
    } else {
      this.updateSaleInfo(0)
    }

    this.render()
  }

  /* Shows the Ads received from Parent Component */
  showAds = () => {
    const adElements = []

    for (let i = 0; i < this.state.ads.length; i++) {
      const currAd = this.state.ads[i]
      adElements.push(
      <Ads id={currAd.id} 
           name={currAd.name} 
           price={currAd.price} 
           rating={currAd.rating} 
           handleClick={this.updateAdInfo}
           deleteAd={this.deleteAd}
           />)
    }
    return adElements
  }

  /* Manually animating react component (Note: Not possible with CSS) */
  scrollAds = (direction) => {
    if (direction === 'right') {
      if (this.adRef !== null) {
        easyScroll({
          'scrollableDomEle': document.getElementById("adsView1"),
          'direction': 'right',
          'duration': 300,
          'easingPreset': 'easeInQuad',
          'scrollAmount': 350
        });
      }
    } else {
      if (this.adRef !== null) {
        easyScroll({
          'scrollableDomEle': document.getElementById("adsView1"),
          'direction': 'left',
          'duration': 200,
          'easingPreset': 'easeInQuad',
          'scrollAmount': 350
        });
      }
    }
  }

  render () {

    // All the ads to display
    let adElements = this.showAds()

    // Case for when user has no ads
    if (adElements.length === 0) {
      adElements = <h1>You Have No Ads</h1>
    }

    return (
      <div id='adsBoard'>
        <h1>View Your Ads</h1>
        {/* Carousal of ads that user can cycle through */}
        <div id="adsCarousal">
          <button onClick={() => this.scrollAds('left')}><ArrowBackIosIcon id='icon-left' /></button>
          <div id="adsView1" ref={this.adRef}>
            {adElements}
          </div>
          <button onClick={() => this.scrollAds('right')}><ArrowForwardIosIcon id='icon-right' /></button>
        </div>
        {/* Addtional information about any ad user clicked */}
        <div id="adInfo">
          <div id="adDetails">
          </div>
          <div id="saleInfo">
          </div>
        </div>
      </div>
    )
  }
}

export default AdsBoard