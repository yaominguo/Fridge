(function () {
    let board = document.querySelector('.board')
    let btn = board.querySelector('.btn'),
        btnYes = board.querySelector('.board-back .yes'),
        btnNo = board.querySelector('.board-back .no');
    btn.addEventListener('click', function (e) {
        let mx = e.clientX - board.offsetLeft,
            my = e.clientY - board.offsetTop;
        let w = board.offsetWidth,
            h = board.offsetHeight;
        let directions = [{
                id: 'top',
                x: w / 2,
                y: 0
            },
            {
                id: 'right',
                x: w,
                y: h / 2
            },
            {
                id: 'bottom',
                x: w / 2,
                y: h
            },
            {
                id: 'left',
                x: 0,
                y: h / 2
            },
        ];
        directions.sort(function (a, b) {
            return distance(mx, my, a.x, a.y) - distance(mx, my, b.x, b.y);
        })
        board.setAttribute('data-direction', directions.shift().id);
        board.classList.add('is-open');
    })
    btnYes.addEventListener('click', function (e) {
        // TODO SOMETHING
        board.classList.remove('is-open');
    })
    btnNo.addEventListener('click', function (e) {
        board.classList.remove('is-open');
    })

    function distance(x1, y1, x2, y2) {
        let dx = x1 - x2,
            dy = y1 - y2;
        return Math.sqrt(dx * dx + dy * dy);
    }
})()