"use client"

import React, {useState} from 'react';
import {Formik, Form, ErrorMessage} from "formik";
import {Star, Send} from 'lucide-react';
import {Label} from "@/components/ui/label";
import {LoadingButton} from "@/components/LoadingButton";
import ReviewsService from "@/services/reviews.service";
import {toast} from "sonner";
import {Card} from "@/components/ui/card";
import {InputField} from "@/components/InputField";
import {reviewSchema} from "@/schemas/review.schema";


interface Props {
	eventId: number;
	onReviewAdded: () => void;
}

export function AddReviewForm({eventId, onReviewAdded}: Props) {
	const [hoverRating, setHoverRating] = useState(0);

	return (
		<Card className="p-6 rounded-2xl border-indigo-100 bg-indigo-50/30 shadow-sm mb-10">
			<div className="flex items-center gap-3 mb-6">
				<div className="bg-indigo-600 p-2 rounded-lg">
					<Star className="w-5 h-5 text-white fill-white"/>
				</div>
				<h3 className="text-xl font-bold text-slate-900">Ostavite recenziju</h3>
			</div>

			<Formik
				initialValues={{rating: 0, comment: ''}}
				validationSchema={reviewSchema}
				onSubmit={async (values, {resetForm}) => {
					try {
						await ReviewsService.createReview({
							...values,
							eventId
						});
						toast.success("Recenzija uspješno poslata!");
						resetForm();
						onReviewAdded();
					} catch (e) {
						console.error(e);
						toast.error("Greška prilikom slanja recenzije.");
					}
				}}
			>
				{({values, setFieldValue, isSubmitting}) => (
					<Form className="space-y-6">
						<div className="space-y-2">
							<Label className="text-sm font-bold text-slate-700">Vaša ocjena</Label>
							<div className="flex gap-1">
								{[1, 2, 3, 4, 5].map((star) => (
									<button
										key={star}
										type="button"
										className="transition-transform hover:scale-110 focus:outline-none"
										onMouseEnter={() => setHoverRating(star)}
										onMouseLeave={() => setHoverRating(0)}
										onClick={() => setFieldValue('rating', star)}
									>
										<Star
											className={`w-8 h-8 ${
												star <= (hoverRating || values.rating)
													? "fill-yellow-400 text-yellow-400"
													: "fill-transparent text-slate-300"
											} transition-colors`}
										/>
									</button>
								))}
							</div>
							<ErrorMessage name="rating" component="p"
										  className="text-red-500 text-xs mt-1 font-medium"/>
						</div>

						<div className="space-y-2">
							<InputField
								as="textarea"
								name="comment"
								label="Komentar"
								placeholder="Podijelite vaše iskustvo sa drugima..."
								className="w-full min-h-28 border rounded-xl border-slate-200 focus:ring-indigo-500/20 bg-white"
							/>
						</div>

						<div className="flex justify-end">
							<LoadingButton
								type="submit"
								loading={isSubmitting}
								className="bg-indigo-600 hover:bg-indigo-700 rounded-xl px-8"
							>
								<Send className="w-4 h-4 mr-2"/>
								Objavi komentar
							</LoadingButton>
						</div>
					</Form>
				)}
			</Formik>
		</Card>
	);
}

