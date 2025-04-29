"use client";

import { cn } from "@/lib/styles";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/input";

enum Query {
  GENERAL = "general",
  SUPPORT = "support",
}

enum Policy {
  ACCEPTED = "accepted",
  REJECTED = "rejected",
}

const schema = z
  .object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    email: z.string().email(),
    query: z.nativeEnum(Query),
    policy: z.boolean(),
    message: z.string().min(1).max(2000),
  })
  .strict()
  .required();

export default function ContactForm() {
  const form = useForm({
    resolver: zodResolver(schema),
    mode: "onSubmit",
    shouldFocusError: true,
    shouldUseNativeValidation: false,
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      query: Query.GENERAL,
      policy: false,
      message: "",
    },
  });

  const {
    register,
    handleSubmit,
    setError,
    formState: { errors, isSubmitting },
  } = form;

  const currentQuery = form.watch("query");

  const submit = handleSubmit((data) => {
    console.log({ data });
    if (!data.policy) {
      setError("policy", {
        message: "To submit this form, please consent to being contacted",
      });
    } else {
    }
  });

  return (
    <form
      onSubmit={submit}
      className={cn(
        "grid grid-cols-1 w-full gap-6 p-8",
        'has-[aria-invalid="true"]:border-error',
        "md:grid-cols-2"
      )}
    >
      <h1
        className={cn(
          "text-3xl text-primary font-bold tracking-tighter",
          "md:col-span-2"
        )}
      >
        Contact Us
      </h1>

      {/* First name */}
      <Input
        key="firstName"
        name="firstName"
        label="First Name"
        register={register}
        hasError={Boolean(errors?.firstName)}
        errorMessage="This field is required"
        required={true}
      />

      {/* Last name */}
      <Input
        key={"lastName"}
        name="lastName"
        label="Last Name"
        register={register}
        required={true}
        hasError={Boolean(errors?.lastName)}
        errorMessage="This field is required"
      />

      {/* Email */}
      <Input
        key="email"
        name="email"
        label="Email Address"
        type="email"
        register={register}
        required={true}
        hasError={Boolean(errors?.email)}
        errorMessage="Please enter a valid email address"
        className="md:col-span-2"
      />

      {/* Query */}
      <div className={cn("flex flex-col gap-2", "md:col-span-2")}>
        <label id="query-label" htmlFor="query">
          Query Type <span className="text-primary">*</span>
        </label>
        <fieldset
          id="query"
          {...register("query")}
          className={cn(
            "grid grid-cols-1 w-full gap-4",
            "md:grid-cols-2",
            "*:data-[selected=true]:bg-focus-background"
          )}
          aria-required="true"
        >
          <label
            id="query-general-label"
            htmlFor="query-general"
            data-selected={currentQuery === Query.GENERAL}
            className={cn(
              "flex gap-2 py-2 px-4 border border-Gray-500 rounded-lg",
              "hover:cursor-pointer hover:border-primary focus:border-primary"
            )}
          >
            <input
              id="query-general"
              type="radio"
              {...register("query")}
              value={Query.GENERAL}
              className="outline-none"
            />
            <span>General Query</span>
          </label>

          <label
            id="query-support-label"
            htmlFor="query-support"
            data-selected={currentQuery === Query.SUPPORT}
            className={cn(
              "flex gap-2 py-2 px-4 border border-Gray-500 rounded-lg",
              "hover:border-primary focus:border-primary focus:bg-focus-background"
            )}
          >
            <input
              id="query-support"
              type="radio"
              {...register("query")}
              value={Query.SUPPORT}
              className="outline-none"
            />
            <span>Support Request</span>
          </label>
        </fieldset>
        {errors.query && (
          <p className="text-error">Please select a query type</p>
        )}
      </div>

      {/* Message */}
      <div className={cn("flex flex-col gap-2", "md:col-span-2")}>
        <label id="message-label" htmlFor="message">
          Message <span className="text-primary">*</span>
        </label>
        <textarea
          {...register("message")}
          aria-required="true"
          aria-describedby="message-label"
          // aria-invalid="true"
          className={cn(
            "p-2 border outline-none border-Gray-500 rounded-lg",
            "hover:cursor-pointer hover:border-primary focus:border-primary focus:bg-focus-background"
          )}
        />
        {errors?.message && (
          <p className="text-error text-sm">This field is required</p>
        )}
      </div>

      {/* Policy */}
      <div className={cn("flex flex-col gap-1", "md:col-span-2")}>
        <label
          id="policy-label"
          htmlFor="policy"
          className="flex items-center gap-2 hover:cursor-pointer"
          aria-required="true"
        >
          <input
            id="policy"
            type="checkbox"
            {...register("policy")}
            aria-required="true"
            aria-describedby="policy-label"
          />
          <span>
            I consent to being contacted by the team
            <span className="text-primary">{" *"}</span>
          </span>
        </label>
        {errors?.policy && (
          <p className="text-error text-sm">
            {/* To submit this form, please consent to being contacted */}
            {errors.policy.message}
          </p>
        )}
      </div>

      {/* Submit */}
      <button
        type="submit"
        disabled={isSubmitting}
        aria-disabled={isSubmitting ? "true" : "false"}
        className={cn(
          "p-2 rounded-lg bg-primary text-primary-text",
          isSubmitting && "border-r-gray-500",
          "md:col-span-2"
        )}
      >
        {isSubmitting ? "Submitting" : "Submit"}
      </button>
    </form>
  );
}
