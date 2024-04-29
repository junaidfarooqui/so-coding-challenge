import { shallowMount, flushPromises } from '@vue/test-utils';
import axios from 'axios';
import ProductPopup from '@/components/ProductPopup.vue';
import ProductGallery from '@/components/ProductGallery.vue';
import ProductTabs from '@/components/ProductTabs.vue';

// Cast axios.get to the jest.Mock type
const mockedAxiosPost = axios.post as jest.Mock;

// Mocking axios post call
jest.mock('axios', () => ({
    post: jest.fn(() => Promise.resolve({ data: mockProduct }))
}));

const mockProduct = {
    id: "prod123",
    name: "Cool Sneakers",
    availableColors: [
        { name: "Red", thumbnail: "/thumbnails/red.png" },
        { name: "Blue", thumbnail: "/thumbnails/blue.png" }
    ],
    availableSizes: ["S", "M", "L"],
    variants: [
        {
            id: "var123",
            color: "Red",
            size: "M",
            price: 99.99,
            specialPrice: 89.99,
            stock: 10,
            SKU: "SKU123",
            condition: "New",
            pictures: ['/images/image1.jpg', '/images/image2.jpg'],
            productDetails: "Detailed information about the product.",
            productFit: "Fits true to size.",
            materialAndCare: "100% cotton, wash cold.",
            sustainability: "Made with recycled materials."
        }
    ]
};

//mockedAxiosPost.mockImplementation(() => Promise.resolve({ data: mockProduct }));

describe('ProductPopup.vue', () => {
    const wrapper = shallowMount(ProductPopup, {
        propsData: { product: {} }
    });

    beforeEach(async () => {
        await flushPromises();
    });

    afterEach(() => {
        jest.clearAllMocks();
    });

    it('loads product details on mount and initializes with the first variant', async () => {
        expect(axios.post).toHaveBeenCalled();
        expect(wrapper.vm.singleProduct).toEqual(mockProduct);
        expect(wrapper.vm.selectedVariant).toEqual(mockProduct.variants[0]);
    });


    it('changes variant when a new color and size are selected', async () => {
        await flushPromises();

        const colorOptions = wrapper.findAll('.color-options li');
        const sizeOptions = wrapper.findAll('.size-options li');

        await colorOptions[1].trigger('click');
        await sizeOptions[2].trigger('click');

        expect(wrapper.vm.selectedVariant.color).toBe('Red');
        expect(wrapper.vm.selectedVariant.size).toBe('M');
    });

    it('closes the popup when close button is clicked', async () => {
        await flushPromises();

        const closeButton = wrapper.find('.btn-close');
        await closeButton.trigger('click');
        expect(wrapper.emitted('closePopup')).toBeTruthy();
    });

    it('formats the price correctly', async () => {
        await flushPromises();

        const priceText = wrapper.vm.getFormattedPrice(89.99);
        expect(priceText).toMatch(/89,99\s€/);
    });

    it('adds product to cart when "Add to Cart" button is clicked', async () => {
        await flushPromises();
        // Mock console.log before each test
        jest.spyOn(console, 'log').mockImplementation(() => {});

        const addToCartButton = wrapper.find('.btn-primary');
        await addToCartButton.trigger('click');
        expect(console.log).toHaveBeenCalledWith('Added to cart:', wrapper.vm.selectedVariant);
    });

    it('renders ProductGallery and ProductTabs with correct props', async () => {
        await flushPromises();

        const productGallery = wrapper.findComponent(ProductGallery);
        const productTabs = wrapper.findComponent(ProductTabs);

        expect(productGallery.props('pictures')).toEqual(mockProduct.variants[0].pictures);
        expect(productTabs.props('product')).toEqual(wrapper.vm.selectedVariant);
    });
});

