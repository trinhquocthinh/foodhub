'use client';

import { zodResolver } from '@hookform/resolvers/zod';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import {
  IoArrowBack,
  IoCallOutline,
  IoCheckmarkCircleOutline,
  IoDocumentTextOutline,
  IoLocationOutline,
  IoPersonOutline,
  IoTimeOutline,
} from 'react-icons/io5';
import { z } from 'zod';

import { useCart } from '@/context/CartContext';
import { getImagePath } from '@/lib/getImagePath';

import './CheckoutPage.scss';

const SERVICE_FEE = 4.5;
const TAX_RATE = 0.08;
const PHONE_NUMBER_PATTERN = /^[+()\d\s-]{8,}$/;
const NOTES_CHARACTER_LIMIT = 280;

const CHECKOUT_COPY = {
  intro:
    'Share your details and timing so we can have everything ready the moment you arrive.',
  empty:
    'Add a few dishes to your order before heading to checkout so we can prep everything with care.',
  dineIn: 'We will have your table staged before you arrive.',
  takeaway: 'We will package everything to travel beautifully.',
  followUp:
    'After submitting, a host will confirm your order details by phone or email within a few minutes.',
} as const;

const checkoutSchema = z.object({
  fullName: z.string().trim().min(2, 'Please share the name for the booking.'),
  email: z
    .string()
    .trim()
    .email('Add a valid email so we can send confirmations.'),
  phone: z
    .string()
    .trim()
    .min(8, 'Phone number should include your area code.')
    .regex(
      PHONE_NUMBER_PATTERN,
      'Use digits, spaces, parentheses, plus or hyphen only.'
    ),
  diningOption: z.enum(['dine-in', 'takeaway']),
  arrivalTime: z
    .string()
    .trim()
    .regex(/^[0-2]\d:[0-5]\d$/, 'Choose an arrival time.'),
  notes: z
    .string()
    .trim()
    .max(NOTES_CHARACTER_LIMIT, 'Keep notes under 280 characters.'),
});

type CheckoutFormData = z.infer<typeof checkoutSchema>;

const defaultValues: CheckoutFormData = {
  fullName: '',
  email: '',
  phone: '',
  diningOption: 'dine-in',
  arrivalTime: '19:00',
  notes: '',
};

const LoadingCheckoutState = () => (
  <section className="checkout-page">
    <div className="checkout-page__hero">
      <h1>Loading checkout...</h1>
    </div>
  </section>
);

const EmptyCheckoutState = ({ message }: { message: string }) => (
  <section className="checkout-page checkout-page--empty">
    <div className="checkout-page__hero">
      <h1>Your table is waiting</h1>
      <p>{message}</p>
      <Link href="/menu" className="btn btn-primary btn-icon">
        Browse the menu
      </Link>
    </div>
  </section>
);

const CheckoutSuccessNotice = () => (
  <div className="checkout-form__notice" role="status" aria-live="polite">
    <IoCheckmarkCircleOutline aria-hidden="true" />
    <div>
      <strong>Request sent</strong>
      <p>Our host will reach out shortly to confirm your booking.</p>
    </div>
  </div>
);

const CheckoutPage = () => {
  const { items, subtotal, isHydrated } = useCart();
  const router = useRouter();
  const [showSuccess, setShowSuccess] = useState(false);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<CheckoutFormData>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: 'onBlur',
  });

  const isEmpty = items.length === 0;

  useEffect(() => {
    if (isHydrated && isEmpty) {
      router.push('/menu');
    }
  }, [isHydrated, isEmpty, router]);

  useEffect(() => {
    if (!isSubmitSuccessful) {
      return;
    }

    setShowSuccess(true);
    const timer = window.setTimeout(() => setShowSuccess(false), 6000);
    return () => window.clearTimeout(timer);
  }, [isSubmitSuccessful]);

  useEffect(() => {
    if (isSubmitting) {
      setShowSuccess(false);
    }
  }, [isSubmitting]);

  const onSubmit = async (_data: CheckoutFormData) => {
    await new Promise(resolve => setTimeout(resolve, 600));
    reset(defaultValues);
  };

  if (!isHydrated) {
    return <LoadingCheckoutState />;
  }

  if (isEmpty) {
    return <EmptyCheckoutState message={CHECKOUT_COPY.empty} />;
  }

  const { intro, dineIn, takeaway, followUp } = CHECKOUT_COPY;
  const notesValue = watch('notes');
  const diningOption = watch('diningOption');
  const remainingCharacters = NOTES_CHARACTER_LIMIT - (notesValue?.length ?? 0);
  const fullNameError = errors.fullName?.message;
  const emailError = errors.email?.message;
  const phoneError = errors.phone?.message;
  const arrivalTimeError = errors.arrivalTime?.message;
  const notesError = errors.notes?.message;

  const fieldClassName = (hasError?: unknown) =>
    hasError ? 'checkout-form__field is-invalid' : 'checkout-form__field';

  const notesHelperId = 'checkout-notes-helper';
  const notesErrorId = 'checkout-notes-error';
  const notesDescribedBy = notesError
    ? `${notesHelperId} ${notesErrorId}`
    : notesHelperId;

  const isDineIn = diningOption === 'dine-in';
  const isTakeaway = diningOption === 'takeaway';
  const serviceFee = SERVICE_FEE;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + serviceFee + tax;

  return (
    <section className="checkout-page" aria-labelledby="checkout-heading">
      <header className="checkout-page__hero">
        <Link
          href="/order"
          className="checkout-page__back"
          aria-label="Back to order review"
        >
          <IoArrowBack aria-hidden="true" />
          Order overview
        </Link>
        <div>
          <h1 id="checkout-heading">Checkout</h1>
          <p>{intro}</p>
        </div>
      </header>

      <div className="checkout-page__layout">
        <form
          className="checkout-form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
        >
          {showSuccess && <CheckoutSuccessNotice />}

          <fieldset>
            <legend>
              <IoPersonOutline aria-hidden="true" /> Contact details
            </legend>

            <div className={fieldClassName(fullNameError)}>
              <label htmlFor="fullName">Full name</label>
              <input
                id="fullName"
                type="text"
                autoComplete="name"
                placeholder="Anna Portfolio"
                aria-invalid={fullNameError ? 'true' : 'false'}
                aria-describedby={fullNameError ? 'fullName-error' : undefined}
                {...register('fullName')}
              />
              {fullNameError && (
                <p id="fullName-error" className="checkout-form__error">
                  {fullNameError}
                </p>
              )}
            </div>

            <div className={fieldClassName(emailError)}>
              <label htmlFor="email">Email address</label>
              <input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="anna@example.com"
                aria-invalid={emailError ? 'true' : 'false'}
                aria-describedby={emailError ? 'email-error' : undefined}
                {...register('email')}
              />
              {emailError && (
                <p id="email-error" className="checkout-form__error">
                  {emailError}
                </p>
              )}
            </div>

            <div className={fieldClassName(phoneError)}>
              <label htmlFor="phone">Phone number</label>
              <input
                id="phone"
                type="tel"
                autoComplete="tel"
                inputMode="tel"
                placeholder="(+84) 123 456 789"
                aria-invalid={phoneError ? 'true' : 'false'}
                aria-describedby={phoneError ? 'phone-error' : undefined}
                {...register('phone')}
              />
              {phoneError && (
                <p id="phone-error" className="checkout-form__error">
                  {phoneError}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <IoLocationOutline aria-hidden="true" /> Dining preferences
            </legend>

            <div className="checkout-form__options" role="radiogroup">
              <label className={`option${isDineIn ? ' option--active' : ''}`}>
                <input
                  type="radio"
                  value="dine-in"
                  aria-checked={isDineIn}
                  {...register('diningOption')}
                />
                <span>
                  Dine in
                  <small>{dineIn}</small>
                </span>
              </label>

              <label className={`option${isTakeaway ? ' option--active' : ''}`}>
                <input
                  type="radio"
                  value="takeaway"
                  aria-checked={isTakeaway}
                  {...register('diningOption')}
                />
                <span>
                  Takeaway
                  <small>{takeaway}</small>
                </span>
              </label>
            </div>

            <div className={fieldClassName(arrivalTimeError)}>
              <label htmlFor="arrivalTime">
                <IoTimeOutline aria-hidden="true" /> Desired arrival time
              </label>
              <input
                id="arrivalTime"
                type="time"
                step={900}
                aria-invalid={arrivalTimeError ? 'true' : 'false'}
                aria-describedby={
                  arrivalTimeError ? 'arrivalTime-error' : undefined
                }
                {...register('arrivalTime')}
              />
              {arrivalTimeError && (
                <p id="arrivalTime-error" className="checkout-form__error">
                  {arrivalTimeError}
                </p>
              )}
            </div>
          </fieldset>

          <fieldset>
            <legend>
              <IoDocumentTextOutline aria-hidden="true" /> Special notes
            </legend>

            <div className={fieldClassName(notesError)}>
              <label htmlFor="notes">Add a note (optional)</label>
              <textarea
                id="notes"
                rows={4}
                placeholder="Allergies, celebrations, seating preferences..."
                aria-invalid={notesError ? 'true' : 'false'}
                aria-describedby={notesDescribedBy}
                {...register('notes')}
              />
              <div
                className="checkout-form__meta"
                id={notesHelperId}
                aria-live="polite"
              >
                <span className="checkout-form__helper">
                  {remainingCharacters} characters left
                </span>
              </div>
              {notesError && (
                <p
                  id={notesErrorId}
                  className="checkout-form__error"
                  role="alert"
                >
                  {notesError}
                </p>
              )}
            </div>
          </fieldset>

          <button
            type="submit"
            className="btn btn-primary btn-icon checkout-form__submit"
            disabled={isSubmitting}
          >
            <IoCallOutline aria-hidden="true" />
            {isSubmitting ? 'Sending details...' : 'Place order request'}
          </button>
        </form>

        <aside
          className="checkout-summary"
          aria-labelledby="checkout-summary-heading"
        >
          <h2 id="checkout-summary-heading">Your order</h2>

          <ul className="checkout-summary__list">
            {items.map(item => (
              <li key={item.id}>
                <div className="media">
                  <Image
                    src={getImagePath(item.image)}
                    alt={item.name}
                    width={64}
                    height={64}
                  />
                </div>
                <div className="copy">
                  <p className="name">{item.name}</p>
                  <p className="meta">Quantity: {item.quantity}</p>
                </div>
                <span className="price">
                  ${(item.price * item.quantity).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>

          <dl className="checkout-summary__totals">
            <div>
              <dt>Subtotal</dt>
              <dd>${subtotal.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Tax (8%)</dt>
              <dd>${tax.toFixed(2)}</dd>
            </div>
            <div>
              <dt>Service fee</dt>
              <dd>${serviceFee.toFixed(2)}</dd>
            </div>
            <div className="checkout-summary__total">
              <dt>Total due</dt>
              <dd>${total.toFixed(2)}</dd>
            </div>
          </dl>

          <p className="checkout-summary__note">{followUp}</p>
        </aside>
      </div>
    </section>
  );
};

export default CheckoutPage;
