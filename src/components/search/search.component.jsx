import "./search.style.css"

export default function Search(props) {
 const { handleSearchInput } = props
 return (
  <div className="searchContainer">
   <input type="text" onChange={(e) => handleSearchInput(e.target.value)} />
   <button>Search</button>
  </div>
 )
}