import { render, screen } from "@testing-library/react"
import userEvent from "@testing-library/user-event"
import ProductCard from "../components/ProductsList/ProductCard"

//MOCKS (PODERIA ESTAR EM ARQUIVO SEPARADO)
const productMock = {
    id: "1",
    image: "htpps://image.png",
    title: "Produto Teste",
    price: 1000
}

const addToCartMock = jest.fn()

//TESTES
describe("Product Card", () => {
    test("testar renderizar card de produto", () => {

        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        //OPCIONAL
        const card = screen.getByText("Produto Teste")
        expect(card).toBeInTheDocument
    })

    //Pratica Guiada 2
    test("testar a renderização do título, imagem, preço e botão de compra", () => {
 
        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const title = screen.getByRole('heading', { name: /produto teste/i })
        const image = screen.getByRole('img', { name: /produto teste/i })
        const price = screen.getByText(/\$1000\.00/i)
        const addBtn = screen.getByRole('button', { name: /buy/i })

        screen.logTestingPlaygroundURL()

        expect(title).toBeInTheDocument()
        expect(image).toBeInTheDocument()
        expect(price).toBeInTheDocument()
        expect(addBtn).toBeInTheDocument()
        
    })

    //Pratica 3 
    test("testar quando o produto de compra for clicado chama a função de adicionar ao carrinho", async () => {

        const user = userEvent.setup()

        render(<ProductCard product={productMock} addToCart={addToCartMock} />)

        const addBtn = screen.getByRole('button', { name: /buy/i })

        await user.click(addBtn)

        // como estou utilizando jest.fn(), posso usar metodos especiais de verificar se a função esta funcionando
        
        //verifica se a função foi chamada
        expect(addToCartMock).toBeCalled()

        //verifica quantas vezes foi chamada
        expect(addToCartMock).toBeCalledTimes(1)

        //verifica qual é o argumento passado na função
        expect(addToCartMock).toBeCalledWith(productMock)
    })

})
