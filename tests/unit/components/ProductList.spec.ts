import { shallowMount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import ProductList from '@/components/ProductList.vue';

// Cast axios.get to the jest.Mock type
const mockedAxiosGet = axios.get as jest.Mock;

jest.mock('axios', () => ({
    get: jest.fn()
}));

describe('ProductList.vue', () => {
    let wrapper;

    beforeEach(() => {
        mockedAxiosGet.mockClear();
    });

    const mockProducts = [
        { id: "1", name: 'Shirt', price: '19.99', pictures: ['/path/to/image.jpg'], brand: { name: 'BrandX', logo: "/path/to/image.jpg" } }
    ];

    it('fetches products and renders them correctly, including names and brands', async () => {
        mockedAxiosGet.mockResolvedValue({ data: { products: mockProducts } });

        wrapper = shallowMount(ProductList);

        await flushPromises();

        expect(mockedAxiosGet).toHaveBeenCalledTimes(1);
        expect(wrapper.vm.products).toEqual(mockProducts);
        expect(wrapper.findAll('.card').length).toBe(1);
        expect(wrapper.find('.product-name').text()).toBe('Shirt');
        expect(wrapper.find('.brand-name').text()).toBe('BrandX');
        expect(wrapper.find('.price').text()).toBe('19.99');
    });

    it('displays a message when no products are found', async () => {
        mockedAxiosGet.mockResolvedValue({ data: { products: [] } });

        wrapper = shallowMount(ProductList);

        await wrapper.vm.$nextTick();
        expect(wrapper.text()).toContain('No products found.');
    });

    it('opens and closes the popup', async () => {
        mockedAxiosGet.mockResolvedValue({ data: { products: mockProducts } });
        wrapper = shallowMount(ProductList);
        await flushPromises(); // Ensure all promises are resolved, including the API call

        // Directly set the component's data property if necessary
        wrapper.vm.products = mockProducts;
        await wrapper.vm.$nextTick(); // Make sure Vue processes the data update

        wrapper.vm.openPopup(mockProducts[0]);
        expect(wrapper.vm.state.isPopupOpen).toBe(true);
        expect(wrapper.vm.state.selectedProduct).toEqual(mockProducts[0]);

        wrapper.vm.closePopup();
        expect(wrapper.vm.state.isPopupOpen).toBe(false);
    });
});
