export default function Spinner({type}) {
    return (type === "full" ? <div className="absolute backdrop-blur-sm inset-0 flex items-center justify-center">
            <div className="loader"></div>
        </div> : <div className="loader"></div>
    )


}
