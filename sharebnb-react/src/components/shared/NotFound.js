import "./NotFound.css";

/** NotFound
 *
 * Renders 404 page
 *
 * RoutesList -> NotFound
 */

function NotFound() {
  return (
    <div className="NotFound">
      <h3 className="NotFound-message">Sorry, we couldn't find that page!</h3>
      <img className="NotFound-photo" src=".../404img.jpg"></img>
    </div>
  );
}

export default NotFound;
