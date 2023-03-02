class Router {
    constructor(){
        this.ROUTES = {
            "/": "/index.html"
        }
        this.NOTFOUND = "/404.html"
        this.#re_route()
        window.onpopstate = this.#re_route.bind(this)
    }

    addRoute(route, path){
        this.ROUTES[route] = path
    }

    router_main(event){

        event = event || window.event
        event.preventDefault()
        console.log(event.target.href);
        window.history.pushState({}, '', event.target.href)
        this.#re_route()
        
    }

    async #re_route(){
        const PATH = window.location.pathname
        const ROUTE = this.ROUTES[PATH] || this.NOTFOUND
        const CONTENT = await fetch(ROUTE).then(data=>data.text())
        this.#re_route_content(CONTENT)
    }

    #re_route_content(CONTENT){
        if(document.getElementById("root")) document.getElementById("root").remove()
        const ROOT = document.createElement("div")
        ROOT.id = "root"
        ROOT.innerHTML = CONTENT
        document.body.appendChild(ROOT)
    }
}


