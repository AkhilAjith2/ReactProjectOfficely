import "./searchItem.css";

const SearchItem = () => {
  return (
    <div className="searchItem">
      <img
        src="https://cf.bstatic.com/xdata/images/hotel/square600/261707778.webp?k=fa6b6128468ec15e81f7d076b6f2473fa3a80c255582f155cae35f9edbffdd78&o=&s=1"
        alt=""
        className="siImg"
      />
        <div className="siDesc">
            <h1 className="siTitle">Tower Street Apartments</h1>
            <span className="siSubtitle">
                Aleksandra Janowskiego 02-341
            </span>
            <span className="siFeatures">Meeting room</span>
            {/*<span className="siTaxiOp">Free airport taxi</span>*/}

        </div>
        <div className="siDetails">
            <button className="siCheckButton">Edit</button>
        {/*<div className="siRating">*/}
        {/*  <span>Excellent</span>*/}
        {/*  <button>8.9</button>*/}
        {/*</div>*/}
        <div className="siDetailTexts">
          <span className="siPrice">$112</span>
          <span className="siTaxOp">Includes taxes and fees</span>
        </div>
      </div>
    </div>
  );
};

export default SearchItem;
