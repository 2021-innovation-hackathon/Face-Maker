module.exports = {

    HTML: function (title, list, body, control) {
        return `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta http-equiv="X-UA-Compatible" content="IE=edge">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Document</title>
        </head>
        <body>
            통계 탭
            ${title}
            ${list}
            ${body}
            ${control}
            <div id="main"></div>
        
            
        </body>
        </html>`;

    }
}