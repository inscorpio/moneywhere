'use client'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import BackTo from '~/components/BackTo'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '~/components/ui/form'
import { Input } from '~/components/ui/input'
import { Input as InputFix, InputProvider, Prefix } from '~/components/ui/input.fix'
import { Container, Header, Main } from '~/components/ui/layout'

export default function Page() {
  const formSchema = z.object({
    name: z.string({ required_error: '账户名称不能为空' }).min(1, '账户名称不能为空').max(50, '账户名称不能超过 50 个字符'),
    amount: z.string(),
  })

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: '',
      amount: '',
    },
  })

  function onSubmit(values: z.infer<typeof formSchema>) {
    // TODO: build API
    // eslint-disable-next-line no-console
    console.log(values)
  }
  return (
    <>
      <Container>
        <Header className="flex-x-between">
          <BackTo href="/wallets" />
          <button onClick={form.handleSubmit(onSubmit)}>保存</button>
        </Header>
        <Main>
          <Form {...form}>
            <form className="space-y-8">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="required">账户名称</FormLabel>
                    <FormControl>
                      <Input placeholder="请输入账户名称" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="amount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>账户余额</FormLabel>
                    <FormControl>
                      <InputProvider>
                        <Prefix>
                          ¥
                        </Prefix>
                        <InputFix
                          type="number"
                          placeholder="0.00"
                          {...field}
                        />
                      </InputProvider>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </Main>
      </Container>
    </>
  )
}
