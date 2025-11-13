const render_url = 'https://render.albiononline.com/v1/item/'

let items = []
let head_items = []
let armor_items = []
let shoe_items = []
let main_items = []
let two_hand_items = []
let off_items = []
let mount_items = []
let cape_items = []
let bag_items = []
let potion_items = []
let food_items = []

const generate_button = document.getElementById('generate-build');

function getItemData() {
    generate_button.enabled = false
    window.indexBridge.getItemData().then(data => {
        items = data.split('\n')
            .map(item => item.split(':').slice(1))
            .slice(0, -1)

        items.forEach(item => {
            item[0] = item[0].trim()
            if (item[1]) {
                item[1] = item[1].trim()
            } else {
                item[1] = "No Name"
            }
        })

        head_items = items.filter(item => item[0].substring(2).startsWith('_HEAD_'))
        armor_items = items.filter(item => item[0].substring(2).startsWith('_ARMOR_'))
        shoe_items = items.filter(item => item[0].substring(2).startsWith('_SHOES_'))
        main_items = items.filter(item => item[0].substring(2).startsWith('_MAIN_'))
        two_hand_items = items.filter(item => item[0].substring(2).startsWith('_2H_') && !item[0].substring(2).startsWith('_2H_TOOL_'))
        off_items = items.filter(item => item[0].substring(2).startsWith('_OFF_'))
        mount_items = items.filter(item => item[0].substring(2).startsWith('_MOUNT_'))
        cape_items = items.filter(item => item[0].substring(2).startsWith('_CAPEITEM_') && !item[0].endsWith('_BP'))
        bag_items = items.filter(item => item[0].substring(2).startsWith('_BAG'))
        potion_items = items.filter(item => item[0].substring(2).startsWith('_POTION_'))
        food_items = items.filter(item => item[0].substring(2).startsWith('_MEAL_') || item[0].substring(2).startsWith('_FISH_'))
        food_items = food_items.filter(item => item[0].substring(2).startsWith('_MEAL_SOUP') ||
            item[0].substring(2).startsWith('_MEAL_SALAD') ||
            item[0].substring(2).startsWith('_MEAL_PIE') ||
            item[0].substring(2).startsWith('_MEAL_OMELETTE') ||
            item[0].substring(2).startsWith('_MEAL_STEW') ||
            item[0].substring(2).startsWith('_FISH_'))
        generate_button.enabled = true
    })
}

function genTitle(item) {
    const parts = item[0].split('@')
    let title = ''
    if (parts.length > 1) {
        title = item[0].substring(0, 2) + "." + parts[1] + " " + item[1]
    } else {
        title = item[0].substring(0, 2) + " " + item[1]
    }
    return title
}

function generateBuild() {
    if (items !== []) {
        const bag_image = document.getElementById('bag-img')
        const head_image = document.getElementById('head-img')
        const cape_image = document.getElementById('cape-img')
        const main_image = document.getElementById('main-img')
        const armor_image = document.getElementById('armor-img')
        const off_image = document.getElementById('off-img')
        const potion_image = document.getElementById('potion-img')
        const shoes_image = document.getElementById('shoes-img')
        const food_image = document.getElementById('food-img')
        const mount_image = document.getElementById('mount-img')

        const chosen_bag = bag_items[Math.floor(Math.random() * bag_items.length)]
        bag_image.src = render_url + chosen_bag[0]
        bag_image.title = genTitle(chosen_bag)

        const chosen_head = head_items[Math.floor(Math.random() * head_items.length)]
        head_image.src = render_url + chosen_head[0]
        head_image.title = genTitle(chosen_head)

        const chosen_cape = cape_items[Math.floor(Math.random() * cape_items.length)]
        cape_image.src = render_url + chosen_cape[0]
        cape_image.title = genTitle(chosen_cape)

        const possible_main = main_items.concat(two_hand_items)
        let skip_off = false
        const chosen_main = possible_main[Math.floor(Math.random() * possible_main.length)]
        main_image.src = render_url + chosen_main[0]
        main_image.title = genTitle(chosen_main)
        if (chosen_main[0].substring(2).startsWith('_2H_')) {
            off_image.src = render_url + chosen_main[0]
            off_image.style.opacity = "0.5"
            off_image.title = genTitle(chosen_main)
            skip_off = true
        }

        const chosen_armor = armor_items[Math.floor(Math.random() * armor_items.length)]
        armor_image.src = render_url + chosen_armor[0]
        armor_image.title = genTitle(chosen_armor)
        if (!skip_off) {
            const chosen_off = off_items[Math.floor(Math.random() * off_items.length)]
            off_image.src = render_url + chosen_off[0]
            off_image.style.opacity = "1"
            off_image.title = genTitle(chosen_off)
        }

        const chosen_potion = potion_items[Math.floor(Math.random() * potion_items.length)]
        potion_image.src = render_url + chosen_potion[0]
        potion_image.title = genTitle(chosen_potion)

        const chosen_shoes = shoe_items[Math.floor(Math.random() * shoe_items.length)]
        shoes_image.src = render_url + chosen_shoes[0]
        shoes_image.title = genTitle(chosen_shoes)

        const chosen_food = food_items[Math.floor(Math.random() * food_items.length)]
        food_image.src = render_url + chosen_food[0]
        food_image.title = genTitle(chosen_food)

        const chosen_mount = mount_items[Math.floor(Math.random() * mount_items.length)]
        mount_image.src = render_url + chosen_mount[0]
        mount_image.title = genTitle(chosen_mount)
    }
}

getItemData()

generate_button.addEventListener('click', generateBuild)