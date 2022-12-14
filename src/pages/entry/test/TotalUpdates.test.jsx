import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Options from '../Options';
import { OrderDetailsProvider } from '../../../contexts/OrderDetails';

test('Update scoop subtotal when scoops change', async () => {
	render(<Options optionType='scoops' />, { wrapper: OrderDetailsProvider });

	// make sure total starts at $0.00
	const scoopSubtotal = screen.getByText('Scoops total: $', { exact: false });
	expect(scoopSubtotal).toHaveTextContent('0.00');

	// update vanilla scoops to 1 and check subtotal
	const vanillaInput = await screen.findByRole('spinbutton', {
		name: 'Vanilla',
	});
	await userEvent.clear(vanillaInput);
	await userEvent.type(vanillaInput, '1');
	expect(scoopSubtotal).toHaveTextContent('2.00');

	// update chocolate scoops to 2 and check subtotal
	const chocolateInput = await screen.findByRole('spinbutton', {
		name: 'Chocolate',
	});
	await userEvent.clear(chocolateInput);
	await userEvent.type(chocolateInput, '2');
	expect(scoopSubtotal).toHaveTextContent('6.00');
});
