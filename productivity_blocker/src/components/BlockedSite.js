import './BlockedSite.css';

function BlockedSite(props) {
    const title = props.title;


    return (
        <div className="blocked-site">
            <p>{title}</p>
        </div>
    );
}

export default BlockedSite;
