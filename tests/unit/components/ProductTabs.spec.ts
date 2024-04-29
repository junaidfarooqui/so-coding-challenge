import { shallowMount } from '@vue/test-utils';
import ProductTabs from '@/components/ProductTabs.vue';
import { Variant } from "@/types";

describe('ProductTabs.vue', () => {

    const product = {
        id: "var123",
        color: "Red",
        size: "M",
        price: 99.99,
        specialPrice: 89.99,
        stock: 10,
        SKU: "SKU123",
        condition: "New",
        pictures: ['/images/image1.jpg', '/images/image2.jpg'],
        productDetails: '<p>Some details about the product</p>',
        productFit: '<p>Information about the fit</p>',
        materialAndCare: '<p>Material and care instructions</p>',
        sustainability: '<p>Environmental impact details</p>'
    };

    const wrapper = shallowMount(ProductTabs, { props: { product } });

    afterEach(() => {
        wrapper.unmount();
    });

    it('renders without errors', () => {
        expect(wrapper.exists()).toBeTruthy();
    });

    it('initially shows the "details" tab as active', () => {
        expect(wrapper.vm.activeTab).toBe('details');
        expect(wrapper.find('.tab-pane').isVisible()).toBe(true);
        expect(wrapper.html()).toContain(product.productDetails);
    });

    it('displays correct tab content when a different tab is clicked', async () => {
        const wrapper = shallowMount(ProductTabs, { props: { product } });

        const tabs = wrapper.findAll('li');
        expect(tabs.length).toBe(4);

        // Simulate clicking on the "fit" tab
        await tabs[1].trigger('click');
        expect(wrapper.vm.activeTab).toBe('fit');
        expect(wrapper.find('.tab-pane.fit').isVisible()).toBe(true);
        expect(wrapper.html()).toContain(product.productFit);

        // Simulate clicking on the "material" tab
        await tabs[2].trigger('click');
        expect(wrapper.vm.activeTab).toBe('material');
        expect(wrapper.find('.tab-pane.material').isVisible()).toBe(true);
        expect(wrapper.html()).toContain(product.materialAndCare);

        // Simulate clicking on the "sustainability" tab
        await tabs[3].trigger('click');
        expect(wrapper.vm.activeTab).toBe('sustainability');
        expect(wrapper.find('.tab-pane.sustainability').isVisible()).toBe(true);
        expect(wrapper.html()).toContain(product.sustainability);
    });

    it('applies the "active" class to the currently active tab', async () => {
        const wrapper = shallowMount(ProductTabs, { props: { product } });

        const tabs = wrapper.findAll('li');

        expect(tabs[0].classes()).toContain('active');

        // Simulate clicking on the "fit" tab
        await tabs[1].trigger('click');
        expect(tabs[1].classes()).toContain('active');
        expect(tabs[0].classes()).not.toContain('active');
    });

    it('maintains the active tab state correctly', async () => {
        const wrapper = shallowMount(ProductTabs, { props: { product } });

        expect(wrapper.vm.activeTab).toBe('details');

        // Change tab to "fit"
        await wrapper.vm.openTab('fit');
        expect(wrapper.vm.activeTab).toBe('fit');

        // Check if still in "fit" after a re-render
        await wrapper.vm.$nextTick();
        expect(wrapper.vm.activeTab).toBe('fit');
    });
});

