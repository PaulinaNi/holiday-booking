import "./search.style.css"

export default function Search(props) {
 const { handleSearchInput, placeholderText } = props
 return (
  <div className="searchContainer">
   <input type="text" placeholder={placeholderText} onChange={(e) => handleSearchInput(e.target.value)} />
  </div>
 )
}