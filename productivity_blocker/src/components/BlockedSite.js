import './BlockedSite.css';

function BlockedSite(props) {
    const title = props.title;
    let url = title;

    if (!(url.startsWith('https://')) && !(url.startsWith('http://'))) {
        url = `http://${url}`
    }

    function openUrl() {
        window.open(url, "_blank");
    }


    return (
        <div onClick={openUrl} className="blocked-site">
            <p>{title}</p>
        </div>
    );
}

export default BlockedSite;
