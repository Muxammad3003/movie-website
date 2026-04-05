export const routes = [
    {
        path: /^\/$/,
        view: async (app) => {
            const response = await fetch('/pages/home/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/home/style.css")
        },
        loadScripts: async () => {
            await import("../pages/home/script.js")
        }
    },
    {
        path: /^\/movie$/,
        view: async (app) => {
            const response = await fetch('/pages/movie/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/movie/style.css")
        },
        loadScripts: async () => {
            await import("../pages/movie/script.js")
        }
    },
    {
        path: /^\/all-details$/,
        view: async (app) => {
            const response = await fetch('/pages/all-details/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/all-details/style.css")
        },
        loadScripts: async () => {
            await import("../pages/all-details/script.js")
        }
    },
    {
        path: /^\/actor-page$/,
        view: async (app) => {
            const response = await fetch('/pages/actor-page/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/actor-page/style.css")
        },
        loadScripts: async () => {
            await import("../pages/actor-page/script.js")
        }
    },
    {
        path: /^\/certain-page$/,
        view: async (app) => {
            const response = await fetch('/pages/certain-page/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/certain-page/style.css")
        },
        loadScripts: async () => {
            await import("../pages/certain-page/script.js")
        }
    },
    {
        path: /^\/all-actors-page$/,
        view: async (app) => {
            const response = await fetch('/pages/all-actors-page/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/all-actors-page/style.css")
        },
        loadScripts: async () => {
            await import("../pages/all-actors-page/script.js")
        }
    },
    {
        path: /^\/premiere-films$/,
        view: async (app) => {
            const response = await fetch('/pages/premiere-films/index.html')

            app.innerHTML = await response.text()
        },
        loadStyles: async () => {
            await import("../pages/premiere-films/style.css")
        },
        loadScripts: async () => {
            await import("../pages/premiere-films/script.js")
        }
    },
]

export const notFound = {
    view: async (app) => {
        const response = await fetch('/pages/error/index.html')

        app.innerHTML = await response.text()
    },
    loadStyles: async () => {
        await import("../pages/error/style.css")
    },
    loadScripts: async () => {
        await import("../pages/error/script.js")
    }
}
