document.addEventListener('DOMContentLoaded', () => {


    const getData = (url, callback) => {
        const request = new XMLHttpRequest();
        request.open('GET', url);
        request.addEventListener('readystatechange', () => {
            if (request.readyState !== 4) return;
            if (request.status === 200) {
                const response = JSON.parse(request.response)
                callback(response);
            }
            else {
                console.error(new Error('Ошибка'));
            }

        });

        request.send();
    }

    const tabs = () => {
        const cardDetailElems = document.querySelectorAll('.card-detail__change'),
            cardDetailsTitleElem = document.querySelector('.card-details__title'),
            cardImageElem = document.querySelector('.card__image_item'),
            cardDetailsPriceElem = document.querySelector('.card-details__price'),
            descriptionMemoryElem = document.querySelector('.description__memory');

        const data = [
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Graphite',
                img: 'img/iPhone-graphite.png',
                price: 99000,
                memory: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 128GB Silver',
                img: 'img/iPhone-silver.png',
                price: 95000,
                memory: 128
            },
            {
                name: 'Смартфон Apple iPhone 12 Pro 256GB Pacific Blue',
                img: 'img/iPhone-blue.png',
                price: 106000,
                memory: 256
            }
        ];

        const deactive = () => {
            cardDetailElems.forEach(elem => elem.classList.remove('active'));
        }

        cardDetailElems.forEach((btn, i) => {
            btn.addEventListener('click', () => {
                if (!btn.classList.contains('active')) {
                    btn.classList.add('active');
                    cardDetailsTitleElem.textContent = data[i].name;
                    cardImageElem.src = data[i].img;
                    cardDetailsPriceElem.textContent = data[i].price;
                    descriptionMemoryElem.textContent = `Встроенная память (ROM) ${data[i].memory} ГБ`;
                }
                deactive();
            });
        });
    };


    const accordion = () => {
        const characteristicsItemELems = document.querySelectorAll('.characteristics__item'),
            characteristicsListElem = document.querySelector('.characteristics__list');

        characteristicsItemELems.forEach(elem => {
            if (elem.children[1].classList.contains('active')) {
                elem.children[1].style.height = `${elem.children[1].scrollHeight}px`;
            }
        });

        const open = (button, dropDown) => {
            closeAllDrops(button, dropDown);
            dropDown.style.height = `${dropDown.scrollHeight}px`;
            button.classList.add('active');
            dropDown.classList.add('active');
        };

        const close = (button, dropDown) => {
            button.classList.remove('active');
            dropDown.classList.remove('active');
            dropDown.style.height = '';
        };


        const closeAllDrops = (button, dropDown) => {
            characteristicsItemELems.forEach(elem => {
                if (elem.children[0] !== button && elem.children[1] !== dropDown) {
                    close(elem.children[0], elem.children[1]);
                }
            });
        }

        characteristicsListElem.addEventListener('click', event => {
            const target = event.target;

            if (target.classList.contains('characteristics__title')) {
                const parent = target.closest('.characteristics__item');
                const description = parent.querySelector('.characteristics__description');
                description.classList.contains('active') ? close(target, description) : open(target, description);
            }

            document.addEventListener('click', event => {
                const target = event.target;
                if (!target.closest('.characteristics__list')) {
                    closeAllDrops();
                }
            });
        });
    }

    const modal = () => {
        const cardDetailsButtonBuy = document.querySelector('.card-details__button_buy'),
            cardDetailsButtonDelivery = document.querySelector('.card-details__button_delivery'),
            cardDetailsTitle = document.querySelector('.card-details__title'),
            modal = document.querySelector('.modal'),
            modalTitle = document.querySelector('.modal__title'),
            modalSubtitle = document.querySelector('.modal__subtitle'),
            modalTitleSubmit = document.querySelector('.modal-title-submit');

        const openModal = event => {
            modal.classList.add('open');
            modalTitle.textContent = cardDetailsTitle.textContent;
            modalTitleSubmit.value = cardDetailsTitle.textContent;
            modalSubtitle.textContent = event.target.dataset.buttonBuy;
        }

        const closeModal = () => {
            modal.classList.remove('open');
        }


        // Открытие модальных окон
        cardDetailsButtonBuy.addEventListener('click', openModal);
        cardDetailsButtonDelivery.addEventListener('click', openModal);

        // Обычное закртытие модального окна
        modal.addEventListener('click', event => {
            const target = event.target;
            if (target.classList.contains('modal__close')) {
                closeModal();
            }

            if (target.classList.contains('modal')) {
                closeModal();
            }
        });

        // Закрытие по клавише Esc
        document.addEventListener('keydown', event => {
            if (event.code === 'Escape') {
                closeModal();
            }
        });
    }

    const renderCrossSell = () => {
        const data = [];
        const crossSellList = document.querySelector('.cross-sell__list'),
              buttonShowAll = document.querySelector('.button-show-all');

        // Перемешиваем массива
        const shuffle = (arr) => {
            return arr.sort(() => Math.round(Math.random() * 100) - 50);
        }

        // Добавляем верстку
        const createCrossSellItem = good => {
            const liItem = document.createElement('li');
            liItem.innerHTML = `
                <article class="cross-sell__item">
                    <img class="cross-sell__image" src=${good.photo} alt="">
                    <h3 class="cross-sell__title">${good.name}</h3>
                    <p class="cross-sell__price">${good.price} Руб.</p>
                    <button class="button button_buy cross-sell__button">Купить</button>
                </article>`;

            return liItem;
        }

        const crossAddItem = data => {
            crossSellList.append(createCrossSellItem(data));
        }

        // Добавление элементов на страницу
        const addItemCount = count => {
            for (let i = 0; i < count; i++) {
                crossAddItem(data[i]);
            }  
        }

        const createCrossSellList = (goods) => {
            goods.forEach(item => {
                data.push(item);
                shuffle(data);
            });
            countItem(data)
            addItemCount(4);
        };

        //Подсчет кол-ва элементов в JSON
        const countItem = data => {
            const n = data.length;
            return n;
        }

        // Нажатие на кноку показать еще
        buttonShowAll.addEventListener('click', () => {
            crossSellList.innerHTML = '';
            addItemCount(countItem(data));
            buttonShowAll.remove();
        });

        // Соедиенение с сервером
        getData('cross-sell-dbase/dbase.json', createCrossSellList);
    }



    tabs();
    accordion();
    modal();
    renderCrossSell();
    amenu('.header__menu', ".header-menu__list", '.header-menu__item', '.header-menu__burger');
});
