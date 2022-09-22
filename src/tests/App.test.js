import React from 'react';
import { render, screen, waitFor, cleanup } from '@testing-library/react';
import App from '../App';
import mockData from './mock/mockData';
import userEvent from '@testing-library/user-event';

describe('test the page', () => {
  afterEach(cleanup);
  it('if the fetch method are called', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await expect(global.fetch).toHaveBeenCalled();
    await expect(global.fetch).toBeCalledTimes(1);
  });

  it('if the inputs are on the screen and they have a correct behavior when filter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    await expect(columnFilter).toBeInTheDocument();
    await expect(comparisonFilter).toBeInTheDocument();
    await expect(valueFilter).toBeInTheDocument();
    await expect(buttonFilter).toBeInTheDocument();

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '12000');
    userEvent.click(buttonFilter);

    await expect(screen.getAllByRole('row')).toHaveLength(6);
    const buttonRemove = await screen.getByRole('button', { name: 'remove' })
    await expect(buttonRemove).toBeInTheDocument();
    userEvent.click(buttonRemove);
    await expect(screen.getAllByRole('row')).toHaveLength(11);
    await expect(global.fetch).toBeCalledTimes(1);
  });

  it('if is possible filter by "menor que"', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonFilter);

    await expect(screen.getAllByTestId('planet-name')).toHaveLength(3);
  });

  it('if is possible filter by name', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const nameFilter = screen.getByTestId('name-filter');
    userEvent.type(nameFilter, 'be');

    expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
  });

  it('if is possible filter without select column', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.type(valueFilter, '1200');
    userEvent.click(buttonFilter);
    await userEvent.click(buttonFilter);

    await expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
  });

  it('if is possible remove filters', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '1000');
    userEvent.click(buttonFilter);
    waitFor(() => {
      expect(screen.getAllByTestId('planet-name')).toHaveLength(1);
    })
    const removeAllButton = screen.getByRole('button', { name: /remover todas/i });
    userEvent.click(removeAllButton);
    waitFor(() => {
      expect(screen.getAllByTestId('planet-name')).toHaveLength(10);
    })
  });

  it('if is possible order "ASC" the planets', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const columnSort  = screen.getByTestId('column-sort');
    const radioSortASC  = screen.getByTestId('column-sort-input-asc');
    const buttonSort = screen.getByRole('button', { name: /order/i });

    userEvent.selectOptions(columnSort, 'population');
    userEvent.click(radioSortASC);
    userEvent.click(buttonSort);

    const planetsSort = screen.getAllByTestId('planet-name');
    const expectedOrder = ['Yavin IV', 'Tatooine', 'Bespin', 'Endor', 'Kamino', 'Alderaan', 'Naboo', 'Coruscant', 'Hoth', 'Dagobah'];

    planetsSort.forEach((planet, i) => expect(planet).toHaveTextContent(expectedOrder[i]));
  });

  it('if is possible order "DESC" the planets', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const columnSort  = screen.getByTestId('column-sort');
    const radioSortDESC  = screen.getByTestId('column-sort-input-desc');
    const buttonSort = screen.getByRole('button', { name: /order/i });

    userEvent.selectOptions(columnSort, 'surface_water');
    userEvent.click(radioSortDESC);
    userEvent.click(buttonSort);

    const planetsSort = screen.getAllByTestId('planet-name');
    const expectedOrder = ['Hoth', 'Kamino', 'Alderaan', 'Naboo', 'Yavin IV', 'Dagobah', 'Endor', 'Tatooine', 'Bespin', 'Coruscant'];

    planetsSort.forEach((planet, i) => expect(planet).toHaveTextContent(expectedOrder[i]));
  });

  it('if is possible filter by "igual a"', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'diameter');
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.type(valueFilter, '12240');
    userEvent.click(buttonFilter);
    waitFor(() => expect(screen.getAllByTestId('planet-name')).toHaveLength(1))
  });

  it('if is possible filter just click on the button', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const buttonFilter = screen.getByTestId('button-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.click(buttonFilter);
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.click(buttonFilter);
    userEvent.click(buttonFilter);

    waitFor(() => expect(screen.getAllByTestId('planet-name')).toHaveLength(6))
    const buttonsRemove = screen.getAllByRole('button', { name: /remove/i });
    expect(buttonsRemove).toHaveLength(6);
    userEvent.click(buttonsRemove[4]);
    waitFor(() => expect(screen.getAllByTestId('planet-name')).toHaveLength(10))
  });

  it('if is possible order before filter', async () => {
    global.fetch = jest.fn(async () => ({
      json: async () => mockData,
    }))
    render(<App />);
    await waitFor(() => expect(global.fetch).toBeCalled());

    const columnFilter = screen.getByTestId('column-filter');
    const comparisonFilter = screen.getByTestId('comparison-filter');
    const valueFilter = screen.getByTestId('value-filter');
    const buttonFilter = screen.getByTestId('button-filter');

    userEvent.selectOptions(columnFilter, 'population')
    userEvent.selectOptions(comparisonFilter, 'maior que');
    userEvent.type(valueFilter, '1000');
    userEvent.click(buttonFilter);
    waitFor(async() => {
      await expect(screen.getAllByTestId('planet-name')).toHaveLength(7);
    })
    const columnSort  = screen.getByTestId('column-sort');
    const radioSortASC  = screen.getByTestId('column-sort-input-asc');
    const buttonSort = screen.getByRole('button', { name: /order/i });

    userEvent.selectOptions(columnSort, 'diameter');
    userEvent.click(radioSortASC);
    userEvent.click(buttonSort);

    const expectedOrder = ['Endor', 'Tatooine', 'Naboo', 'Coruscant', 'Alderaan', 'Kamino', 'Bespin'];
    const planetsSort = await screen.getAllByTestId('planet-name');

    planetsSort.forEach(async (planet, i) => await expect(planet).toHaveTextContent(expectedOrder[i]));
    await expect(screen.getAllByTestId('planet-name')).toHaveLength(7);

    const removeButton = screen.getByRole('button', { name: 'remove' });
    userEvent.click(removeButton);
    await expect(screen.getAllByTestId('planet-name')).toHaveLength(10);

    userEvent.selectOptions(columnFilter, 'rotation_period')
    userEvent.selectOptions(comparisonFilter, 'igual a');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '23');
    userEvent.click(buttonFilter);

    await expect(screen.getAllByTestId('planet-name')).toHaveLength(3);

    userEvent.selectOptions(columnFilter, 'diameter')
    userEvent.selectOptions(comparisonFilter, 'menor que');
    userEvent.clear(valueFilter);
    userEvent.type(valueFilter, '10000');
    userEvent.click(buttonFilter);

    await expect(screen.getAllByTestId('planet-name')).toHaveLength(2);
  });

})


