window.addEventListener('load', () => {
    console.log("START JS");

    callApiForUser();
    document.querySelector("#js_selected_users").addEventListener("change", e => callApiForPost(e));
}, false);

const callApiForUser = () => {
    let url = new URL("https://jsonplaceholder.typicode.com/users");
    fetch(url, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json'
          },
    }).then(res => res.json()).then(res => {
        console.log(res);
        let renderView = "";
        res.map((value, key) => {
            renderView += `<option value=` + value.id + `>` + value.name + `</option>`;
        })
        setTimeout(() => {
            document.querySelector("#js_selected_users").innerHTML = renderView;
        }, 3000);
    })
}




const callApiForPost = (e) => {
    console.log("lol");
    e.preventDefault();

    console.log("start call api for post");
    document.querySelector("#js_table").classList.add("d-none");
    document.querySelector("#js_spinner").innerHTML = `<div class="spinner-border" role="status"><span class="visually-hidden">Loading...</span></div>`;

    let url = new URL("https://jsonplaceholder.typicode.com/posts");

    // On y ajoute des paramètres
    url.searchParams.set('userId', e.currentTarget.value);
    fetch(url, {
        method: "GET"
    }).then(res => res.json()).then(res => {
        let renderView = "";
        if (!res.length) renderView = `<tr><th scope="row">Aucun post</th></tr>`;
        res.map((value, key) => {
            console.log(key);
            renderView += `
                <tr>
                    <th scope="row">`+ value.userId + `</th>
                    <td>`+ value.id + `</td>
                    <td>`+ value.title + `</td>
                    <td>`+ value.body + `</td>
                </tr>
            `;
        })
        setTimeout(() => {
            document.querySelector("#js_render").innerHTML = renderView;
            document.querySelector("#js_table").classList.remove("d-none");
            document.querySelector("#js_spinner").innerHTML = ``;
        }, 3000)


    });
}