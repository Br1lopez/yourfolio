export function getPageData() {
    // ___________TEMPORAL______________

    // Se pasa de JSON a localStorage (se hace solo UNA vez)
    if (localStorage.getItem("pageData") == null || new URLSearchParams(window.location.search).get("reset") == "1") {
        fetch("./data.json")
            .then(response => response.json())
            .then(data => {
                localStorage.setItem("pageData", JSON.stringify(data));
            });
    }

    //______________________

    return JSON.parse(localStorage.getItem("pageData"))
}
